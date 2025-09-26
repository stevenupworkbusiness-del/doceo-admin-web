import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import { listHospitals } from "@/graphql/queries";
import { API } from "aws-amplify";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingIndicator } from "stream-chat-react";
import { TbTrash, TbEdit } from "react-icons/tb";
import {
  CreateHospitalMutation,
  DeleteHospitalMutation,
  UpdateHospitalMutation,
  ListHospitalsQuery,
} from "@/types";
import { GraphQLQuery } from "@aws-amplify/api";
import { createHospital, deleteHospital, updateHospital } from "@/graphql/mutations";

Modal.setAppElement("#__next");

const HospitalsModal: React.FC<{ onToggleMenu: Function }> = ({
  onToggleMenu,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextToken, setNextToken] = useState<string>();
  const [hospitals, setHospitals] = useState<Record<any, any>[]>([]);
  const [addModal, setAddModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Record<any, any> | null>(null);

  useEffect(() => {
    if (hasMore) {
      loadHospitals();
    }
  }, []);

  const onAddHospital = async ({ name, address }: Record<string, string>) => {
    try {
      let { data: res } = await API.graphql<
        GraphQLQuery<CreateHospitalMutation>
      >({
        query: createHospital,
        variables: {
          input: {
            name: name,
            address: address,
          },
        },
      });

      if (res?.createHospital) {
        setHospitals([...hospitals, res.createHospital!]);
        setAddModal(false);
        setIsEditMode(false);
        setSelectedHospital(null);
        formik.setValues({
          name: "",
          address: "",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onEditHospital = async ({ name, address }: Record<string, string>) => {
    if (!selectedHospital) return;

    try {
      let { data: res } = await API.graphql<
        GraphQLQuery<UpdateHospitalMutation>
      >({
        query: updateHospital,
        variables: {
          input: {
            id: selectedHospital.id,
            name: name,
            address: address,
          },
        },
      });

      if (res?.updateHospital) {
        setHospitals(hospitals.map(hospital =>
          hospital.id === selectedHospital.id ? res.updateHospital! : hospital
        ));
        setAddModal(false);
        setIsEditMode(false);
        setSelectedHospital(null);
        formik.setValues({
          name: "",
          address: "",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const formik = useFormik<Record<string, string>>({
    initialValues: { name: "", address: "" },
    onSubmit: isEditMode ? onEditHospital : onAddHospital,
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const loadHospitals = async () => {
    if (isLoading) return;
    setLoading(true);

    try {
      let { data: res } = await API.graphql<GraphQLQuery<ListHospitalsQuery>>({
        query: listHospitals,
        variables: {
          nextToken: nextToken,
        },
      });

      if (res?.listHospitals?.items) {
        setHospitals([
          ...hospitals,
          ...res.listHospitals.items.map((item) => item!),
        ]);
      }

      if (res?.listHospitals?.nextToken) {
        setNextToken(res.listHospitals.nextToken);
      } else {
        setHasMore(false);
      }
    } catch (e) {
      console.error(e);
      setHasMore(false);
    }
    setLoading(false);
  };

  const onRemoveHospital = async (id: string) => {
    if (window.confirm("You want to remove this hospital?")) {
      try {
        const res = await API.graphql<GraphQLQuery<DeleteHospitalMutation>>({
          query: deleteHospital,
          variables: {
            input: {
              id: id,
            },
          },
        });

        if (res.data?.deleteHospital) {
          setHospitals(hospitals.filter((hospital) => hospital.id !== id));
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const showAddModal = () => {
    setAddModal(true);
    setIsEditMode(false);
    setSelectedHospital(null);
    formik.setValues({
      name: "",
      address: "",
    });
  };

  const closeAddModal = () => {
    setAddModal(false);
    setIsEditMode(false);
    setSelectedHospital(null);
    formik.setValues({
      name: "",
      address: "",
    });
  };

  const handleEdit = (hospital: Record<any, any>) => {
    setSelectedHospital(hospital);
    setIsEditMode(true);
    formik.setValues({
      name: hospital.name,
      address: hospital.address,
    });
  };

  return (
    <>
      <button
        onClick={() => {
          openModal();
          onToggleMenu();
        }}
        className="flex items-start w-full px-4 py-2 mr-0 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-900/20 dark:hover:text-white"
      >
        Hospitals ⭐️
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Settings Modal"
        className="top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full p-0 m-0 overflow-auto bg-black bg-opacity-50"
      >
        <div className="modal fade block">
          <div className="modal-dialog modal-dialog-center">
            <div className="modal-content">
              <div className="modal-header">
                <h6 className="modal-title">Hospitals</h6>
                <button
                  type="button"
                  className="btn-close"
                  onClick={showAddModal}
                >
                  +
                </button>
                <button
                  type="button"
                  className="btn-close ml-2"
                  onClick={closeModal}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body  text-muted leading-relaxed">
                <ul>
                  {hospitals.map((hospital, index) => (
                    <li key={index} className="border-b flex items-center py-2">
                      <span className="mr-2.5">{hospital.name}</span>
                      <button
                        onClick={() => {
                          handleEdit(hospital);
                          setAddModal(true);
                        }}
                        className="ml-auto"
                      >
                        <TbEdit />
                      </button>
                      <button
                        onClick={() => onRemoveHospital(hospital.id)}
                        className="ml-2"
                      >
                        <TbTrash />
                      </button>
                    </li>
                  ))}
                </ul>
                <InfiniteScroll
                  style={{ overflow: "unset" }}
                  dataLength={hospitals.length}
                  next={loadHospitals}
                  hasMore={hasMore}
                  loader={
                    <div className="flex justify-center">
                      <LoadingIndicator size={36} />
                    </div>
                  }
                >
                  <></>
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="flex flex-col w-5/6 p-0 overflow-x-hidden overflow-y-scroll bg-white rounded shadow-lg h-5/6 sm:h-4/6 md:w-4/6">
            <div className="px-4 py-4 m-0 text-base font-extrabold text-left">
              Other Admins
            </div>
            <div className="h-0.5 bg-slate-400 w-full mt-0 mb-0">
              <button type="button" className="btn-close" onClick={closeModal}>
                &times;
              </button>
            </div>
          </div>
        </div> */}
      </Modal>
      <Modal
        isOpen={addModal}
        onRequestClose={closeAddModal}
        contentLabel="Add Modal"
        overlayClassName="!bg-transparent"
        className="top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full p-0 m-0 overflow-auto"
      >
        <div className="modal fade block">
          <div className="modal-dialog modal-dialog-center lg:max-w-[640px]">
            <div className="modal-content shadow-sm">
              <div className="modal-header">
                <h6 className="modal-title">
                  {isEditMode ? "Edit Hospital" : "Add Hospital"}
                </h6>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeAddModal}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <form
                  className="w-full pl-4 pr-4"
                  onSubmit={formik.handleSubmit}
                  id="add-hospital-form"
                >
                  <div className="w-full">
                    <label htmlFor="Name" className="font-extrabold label">
                      Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      id="Name"
                      className="w-full form-control dark:bg-slate-800/60 dark:border-slate-700/50"
                      placeholder=""
                      required
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="w-full mt-4">
                    <label htmlFor="Address" className="font-extrabold label">
                      Address
                    </label>
                    <input
                      name="address"
                      type="text"
                      id="Address"
                      className="w-full form-control dark:bg-slate-800/60 dark:border-slate-700/50"
                      placeholder=""
                      required
                      value={formik.values.address}
                      onChange={formik.handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="px-2 py-2 text-base font-bold text-white bg-red-500 rounded hover:bg-blue-700 "
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  form="add-hospital-form"
                  className="px-4 py-2 ml-4 text-base font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                >
                  {isEditMode ? "保存" : "保存"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HospitalsModal;
