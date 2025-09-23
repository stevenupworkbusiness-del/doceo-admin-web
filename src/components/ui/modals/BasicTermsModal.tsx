import { FormEventHandler, useEffect, useMemo, useState } from "react";
import axios from "axios";

const BasicTermsModal: React.FC<{ onCloseModal: Function }> = ({
  onCloseModal,
}) => {
  const [loading, setLoading] = useState(false);
  const [terms, setTerms] = useState("");

  useEffect(() => {
    const getTerms = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/terms");
        setTerms(data);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };

    getTerms();
  }, []);

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post("/api/terms", {
        terms: terms,
      });
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div className="modal fade block">
      <div className="modal-dialog modal-dialog-center lg:max-w-[640px]">
        <div className="modal-content shadow-sm relative">
          <div className="modal-body">
            <form
              className={
                "w-full pl-4 pr-4" + (loading ? " pointer-events-none" : "")
              }
              onSubmit={onSubmit}
              id="update-hospital-form"
            >
              <div className="w-full">
                <label className="font-extrabold label">
                  Basic Terms of ROOM
                </label>
                <textarea
                  name="term"
                  className="form-control dark:bg-slate-800/60 dark:border-slate-700/50 h-72"
                  required
                  onChange={(e) => setTerms(e.target.value)}
                  value={terms}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={() => onCloseModal()}
              className="px-2 py-2 text-base font-bold text-white bg-red-500 rounded hover:bg-blue-700 "
            >
              Close
            </button>
            <button
              type="submit"
              form="update-hospital-form"
              className="px-4 py-2 ml-4 text-base font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
          {loading && (
            <div className="absolute top-0 left-0 w-full h-full z-999 flex items-center justify-center">
              <svg
                className="animate-spin h-10 w-10 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicTermsModal;
