import React from "react";
import { Formik } from "formik";
import axios from "axios";
import { useFeedContext } from "react-activity-feed";

type Props = {
  id: string;
  time: string;
  text: string;
  onHideModal: Function;
};

const MediaEditModal: React.FC<Props> = ({ onHideModal, id, text, time }) => {
  const { feedManager } = useFeedContext();

  const onSubmit = async (data: { title: String }) => {
    try {
      await axios.put("/api/media", {
        foreign_id: id,
        time: time,
        text: data.title,
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

  return (
    <>
      <div className="modal fade block">
        <div className="modal-dialog modal-dialog-center">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title">Update Media</h6>
              <button type="button" className="btn-close" onClick={hideModal}>
                &times;
              </button>
            </div>
            <div className="modal-body  text-muted leading-relaxed">
              <Formik
                initialValues={{
                  title: text,
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

export default MediaEditModal;
