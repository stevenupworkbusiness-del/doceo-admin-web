import React from "react";
import { Formik } from "formik";
import { API } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import { createTag } from "@/graphql/mutations";
import { CreateTagMutation } from "@/types";
import { useSelector } from "react-redux";
import { selectOrderedCategoriesList } from "@/lib/store/categories";
import axios from "axios";
import { useAuth } from "@/lib/hooks/useAuth";

type Props = {
  room: string;
  showModal: boolean;
  onHideModal: Function;
};

const MediaCreateModal: React.FC<Props> = ({
  showModal,
  onHideModal,
  room,
}) => {
  const user = useAuth();

  if (!showModal) {
    return <></>;
  }

  const onSubmit = async (data: { title: String }) => {
    try {
      await axios.post("/api/media", {
        user_id: user?.username,
        text: data.title,
        room: room,
      });
      onHideModal();
    } catch (e) {
      console.error(e);
    }
  };

  const hideModal = () => {
    onHideModal();
  };

  return (
    <>
      <div className="modal fade block">
        <div className="modal-dialog modal-dialog-center">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title">Create Media</h6>
              <button type="button" className="btn-close" onClick={hideModal}>
                &times;
              </button>
            </div>
            <div className="modal-body  text-muted leading-relaxed">
              <Formik
                initialValues={{
                  title: "",
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
                      <textarea
                        name="title"
                        id="text"
                        className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
                        required
                        onChange={handleChange}
                        value={values.title.toString()}
                        rows={4}
                      />
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

export default MediaCreateModal;
