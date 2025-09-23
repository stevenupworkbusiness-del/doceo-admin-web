import React, { useMemo, useState } from "react";
import { Formik } from "formik";
import { API, Storage } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import { createTag } from "@/graphql/mutations";
import { CreateTagMutation } from "@/types";
import { useSelector } from "react-redux";
import { selectOrderedCategoriesList } from "@/lib/store/categories";
import axios from "axios";
import { useAuth } from "@/lib/hooks/useAuth";
import { useFeedContext } from "react-activity-feed";
import { resizeImage } from "@/utils";
import Image from "next/image";

type Props = {
  item: any;
  onHideModal: Function;
};

const MediumEditModal: React.FC<Props> = ({ item, onHideModal }) => {
  const user = useAuth();
  const { feedManager } = useFeedContext();
  const [attachment, setAttachment] = useState<File>();
  const preview = useMemo(() => {
    if (attachment && attachment.type != "application/pdf") {
      return URL.createObjectURL(attachment);
    }
    return item.data.filePath;
  }, [attachment, item]);

  const onSubmit = async (data: { title: String; text: String }) => {
    try {
      let newAttachment;
      if (attachment) {
        Storage.configure({
          region: "ap-northeast-1",
          bucket: "doceonewfb798f78a5bb417495ce5a866313554d214353-prod",
        });
        let res;
        if (attachment.type !== "application/pdf") {
          const resized = await resizeImage(attachment, 500, 500);
          res = await Storage.put(attachment?.name, resized, {
            level: "public",
          });
        } else {
          res = await Storage.put(attachment.name, attachment, {
            level: "public",
          });
        }
        newAttachment = (await Storage.get(res.key)).split("?")[0];
      }

      await axios.put("/api/medium", {
        reaction_id: item.id,
        data: {
          ...data,
          filePath: newAttachment ?? item.data.filePath,
          fileType: attachment
            ? attachment.type === "application/pdf"
              ? "pdf"
              : "image"
            : item.data.fileType,
        },
      });
      feedManager.refresh();
      onHideModal();
    } catch (e) {
      console.error(e);
    }
  };

  const hideModal = () => {
    onHideModal();
  };

  const uploadImage = (e: File) => {
    setAttachment(e);
  };

  return (
    <>
      <div className="modal fade block">
        <div className="modal-dialog modal-dialog-center">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title">Create Medium</h6>
              <button type="button" className="btn-close" onClick={hideModal}>
                &times;
              </button>
            </div>
            <div className="modal-body  text-muted leading-relaxed">
              <Formik
                initialValues={{
                  title: item.data.title as string,
                  text: item.data.text as string,
                }}
                onSubmit={onSubmit}
              >
                {({ values, handleChange, handleSubmit }) => (
                  <form
                    className="p-6"
                    onSubmit={handleSubmit}
                    id="tag-create-form"
                  >
                    <div className="">
                      <label htmlFor="title" className="label">
                        Title
                      </label>
                      <input
                        name="title"
                        className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
                        required
                        onChange={handleChange}
                        value={values.title.toString()}
                      />
                    </div>
                    <div className="mt-4">
                      <label htmlFor="text" className="label">
                        Text
                      </label>
                      <textarea
                        name="text"
                        id="text"
                        className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
                        required
                        onChange={handleChange}
                        value={values.text.toString()}
                        rows={4}
                      />
                    </div>
                    <div className="mt-4">
                      <label className="label">Attachment</label>
                      <div className="preview-box block justify-center rounded overflow-hidden bg-slate-50 dark:bg-slate-900/20 p-4 mb-4">
                        {attachment?.type != "application/pdf"
                          ? preview && (
                            <Image
                              className="object-cover"
                              src={preview}
                              alt="Attachment"
                              width={300}
                              height={300}
                            />
                          )
                          : attachment.name}
                      </div>
                      <input
                        type="file"
                        id="input-file"
                        accept="image/*,.pdf"
                        onChange={(e) => uploadImage(e.target.files![0])}
                        hidden
                      />
                      <label
                        className="px-3 py-2 mt-4 text-sm font-semibold text-white bg-blue-500 rounded btn-upload lg:px-4 hover:bg-blue-600"
                        htmlFor="input-file"
                      >
                        Upload Attachment
                      </label>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
            <div className="modal-footer">
              <button
                onClick={hideModal}
                type="button"
                className="focus:outline-none text-white bg-red-500 hover:bg-red-600  font-medium rounded text-sm px-3 py-2 mr-2 dark:bg-red-500 dark:hover:bg-red-600  close"
              >
                Close
              </button>
              <button
                form="tag-create-form"
                type="submit"
                className="text-white bg-blue-500 hover:bg-blue-600  font-medium rounded text-sm px-3 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none  my-auto"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-overlay"></div>
    </>
  );
};

export default MediumEditModal;
