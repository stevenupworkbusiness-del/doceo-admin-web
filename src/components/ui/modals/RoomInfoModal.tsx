import { Storage } from "aws-amplify";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  roomsActions,
  selectSelectedRoom,
  selectShowInfoModal,
} from "@/lib/store/rooms";
import {
  Channel,
  ChannelDetail,
  CreateQuestionnaireMutation,
  DeleteQuestionnaireMutation,
  ListQuestionnairesQuery,
  Questionnaire,
  UpdateQuestionnaireMutation,
} from "@/types";
import { getRandomId, preventDefaultAndStopPropagation, resizeImage } from "@/utils";
import { selectTagsList } from "@/lib/store/tags";
import { API } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import {
  createQuestionnaire,
  deleteQuestionnaire,
  updateQuestionnaire,
} from "@/graphql/mutations";
import { TbCheck, TbEdit, TbTrash, TbX, TbInfoCircle } from "react-icons/tb";
import { listQuestionnaires } from "@/graphql/queries";
import axios from "axios";
import { useAuth } from "@/lib/hooks/useAuth";
import { selectOrderedCategoriesList } from "@/lib/store/categories";
import { FaCheck } from "react-icons/fa";
import BasicTermsModal from "./BasicTermsModal";

const RoomInfoModal = () => {
  const [step, setStep] = useState(1);
  const selectedRoom = useSelector(selectSelectedRoom);
  const showModal = useSelector(selectShowInfoModal);
  const dispatch = useDispatch();
  const tags = useSelector(selectTagsList);
  const [banner, setBanner] = useState<File>();
  const [clearMessage, setClearMessage] = useState(false);
  const preview = useMemo(() => {
    if (banner) {
      return URL.createObjectURL(banner);
    }
    return (selectedRoom as ChannelDetail)?.channel.image;
  }, [selectedRoom, banner]);
  const [newQuestion, setNewQuestion] = useState("");
  const [updateQuestion, setUpdateQuestion] = useState("");
  const [questions, setQuestions] = useState<Questionnaire[]>([]);
  const [editQuestion, setEditQuestion] = useState(-1);
  const fomrRef = useRef<HTMLFormElement>(null);
  const categories = useSelector(selectOrderedCategoriesList);
  const [showBasicTerm, setShowBasicTerm] = useState(false);

  // Chat Client
  const user = useAuth();
  const initialValues = useMemo(() => {
    return (
      (selectedRoom as ChannelDetail)?.channel ?? {
        id: getRandomId("room"),
        type: "room",
        image: "",
        name: "",
        category: "",
        subcat: "",
        description: "",
        questions: [],
        // disabled: false,
        frozen: false,
        intractable: "",
        tags: [],
        billable: false,
        checkout_url: "",
        price: "500",
        price_desc: "",
        terms: "",
        isCustomTerm: "",
      }
    );
  }, [selectedRoom]);
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values: Channel) => {
      let newImage;

      try {
        if (banner && !clearMessage) {
          Storage.configure({
            region: "ap-northeast-1",
            bucket: "doceonewfb798f78a5bb417495ce5a866313554d214353-prod",
          });
          const resized = await resizeImage(banner, 500, 500);
          let res = await Storage.put(banner?.name, resized, {
            level: "public",
          });
          newImage = (await Storage.get(res.key)).split("?")[0];
        }

        if (selectedRoom) {
          let { data: response } = await axios.post("/api/channel", {
            type: "room",
            id: values.id,
            mode: "update",
            name: values.name!,
            image: newImage,
            description: values.description!,
            questions: values.questions ?? [],
            tags: values.tags ?? [],
            // disabled: values.disabled!,
            frozen: values.frozen,
            category: values.category,
            subcat: values.subcat,
            clearImage: clearMessage,
            user_id: user?.attributes.sub,
            intractable: values.intractable,
            billable: values.billable,
            price: values.price,
            price_desc: values.price_desc,
            checkout_url: values.checkout_url,
            terms: values.terms,
            isCustomTerm: values.isCustomTerm,
          });

          dispatch(
            roomsActions.updateRoom({
              name: response.channel.name,
              image: response.channel.image,
              description: response.channel.description,
              questions: response.channel.questions,
              category: response.channel.category,
              subcat: response.channel.subcat,
              tags: response.channel.tags,
              // disabled: response.channel.disabled
              frozen: response.channel.frozen,
              intractable: response.channel.intractable,
              billable: response.channel.billable,
              price: response.channel.price,
              price_desc: response.channel.price_desc,
              checkout_url: response.channel.checkout_url,
              terms: response.channel.terms,
              isCustomTerm: response.channel.isCustomTerm,
            })
          );
        } else {
          let { data: response } = await axios.post("/api/channel", {
            type: "room",
            id: values.id,
            mode: "new",
            name: values.name!,
            image: newImage,
            description: values.description!,
            questions: values.questions ?? [],
            tags: values.tags ?? [],
            // disabled: values.disabled,
            frozen: values.frozen,
            created_by_id: user?.id,
            category: values.category,
            intractable: values.intractable,
            subcat: values.subcat,
            billable: values.billable,
            price: values.price,
            price_desc: values.price_desc,
            checkout_url: values.checkout_url,
            terms: values.terms,
            isCustomTerm: values.isCustomTerm,
          });

          dispatch(
            roomsActions.addRoom({
              channel: {
                id: response?.channel.id,
                name: response?.channel.name,
                image: response?.channel.image,
                description: response?.channel.description,
                questions: response?.channel.questions,
                tags: response?.channel.tags,
                subcat: response.channel.subcat,
                frozen: response?.channel.frozen,
                category: response.channel.category,
                intractable: response.channel.intractable,
                billable: response.channel.billable,
                price: response.channel.price,
                price_desc: response.channel.price_desc,
                checkout_url: response.channel.checkout_url,
                terms: response.channel.terms,
                isCustomTerm: response.channel.isCustomTerm,
              },
              members: [],
              messages: [],
            })
          );
        }
        dispatch(roomsActions.toggleInfoModal(false));
      } catch (e) {
        console.error(e);
      }
    },
  });

  useEffect(() => {
    const getQuestions = async (id: string) => {
      try {
        const { data } = await API.graphql<
          GraphQLQuery<ListQuestionnairesQuery>
        >({
          query: listQuestionnaires,
          variables: {
            filter: {
              roomId: {
                eq: id,
              },
            },
          },
        });

        setQuestions(data?.listQuestionnaires?.items as Questionnaire[]);
      } catch (e) {
        console.error(e);
      }
    };

    if (initialValues.id) {
      getQuestions(initialValues.id);
    }
    formik.setValues(initialValues);
    setStep(1);
  }, [initialValues]);

  useEffect(() => {
    formik.setFieldValue(
      "questions",
      questions.map((question) => question.id)
    );
  }, [questions]);

  if (!showModal) {
    return <></>;
  }

  const hideModal = () => {
    setBanner(undefined);
    dispatch(roomsActions.toggleInfoModal(false));
    setClearMessage(false);
  };

  const uploadImage = (e: File) => {
    setBanner(e);
    setClearMessage(false);
  };

  const onAddQuestion: React.KeyboardEventHandler<HTMLInputElement> = async (
    e
  ) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      preventDefaultAndStopPropagation(e);

      try {
        const { data } = await API.graphql<
          GraphQLQuery<CreateQuestionnaireMutation>
        >({
          query: createQuestionnaire,
          variables: {
            input: {
              roomId: initialValues.id,
              question: newQuestion,
            },
          },
        });

        setNewQuestion("");
        setQuestions([
          ...questions,
          data?.createQuestionnaire as Questionnaire,
        ]);
      } catch (e) {
        console.error("Error");
      }
    }
  };

  const onUpdateQuestion = async (id: string) => {
    if (!updateQuestion) {
      return window.alert("Question could not be empty");
    }

    try {
      const { data } = await API.graphql<
        GraphQLQuery<UpdateQuestionnaireMutation>
      >({
        query: updateQuestionnaire,
        variables: {
          input: {
            id: id,
            question: updateQuestion,
          },
        },
      });

      setQuestions(
        questions.map((question) => {
          return question.id === id
            ? (data?.updateQuestionnaire as Questionnaire)
            : question;
        })
      );
      setEditQuestion(-1);
    } catch (e) {
      console.error(e);
    }
  };

  const onEditQuestion = (id: number) => {
    if (
      editQuestion > -1 &&
      !window.confirm("You want to cancel current changes?")
    ) {
      return;
    }

    setUpdateQuestion(questions[id].question);
    setEditQuestion(id);
  };

  const onCancelEditQuestion = () => {
    setEditQuestion(-1);
  };

  const onRemoveQuestion = async (id: string) => {
    if (window.confirm("Are you sure you want to remove this questionaire?")) {
      try {
        const { data } = await API.graphql<
          GraphQLQuery<DeleteQuestionnaireMutation>
        >({
          query: deleteQuestionnaire,
          variables: {
            input: {
              id: id,
            },
          },
        });

        setQuestions(questions.filter((question) => question.id !== id));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const nextStep = (e: any) => {
    e.preventDefault();
    if (fomrRef.current?.checkValidity()) {
      setStep(step + 1);
    } else {
      fomrRef.current?.reportValidity();
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onToggleTagSelect = (tagId: string) => {
    let newTags;
    if (tagSelected(tagId)) {
      newTags = (formik.values.tags ?? []).filter((tag) => tag !== tagId);
    } else {
      newTags = [...(formik.values.tags ?? []), tagId];
    }

    formik.setFieldValue("tags", newTags);
  };

  const tagSelected = (tagId: string) => {
    return (formik.values.tags ?? []).findIndex((tag) => tag === tagId) > -1;
  };

  const onGenerateURL = async () => {
    try {
      let { data: res } = await axios.post("/api/checkout", {
        room_id: formik.values.id,
        price: formik.values.price ?? "500",
        desc: formik.values.price_desc,
        image: formik.values.image,
        name: formik.values.name,
      });
      formik.setFieldValue("checkout_url", res.url);
    } catch (e) {}
  };

  const removeImage = () => {
    setClearMessage(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="">
              <label htmlFor="category" className="label">
                Category
              </label>
              <select
                name="category"
                id="category"
                className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
                value={formik.values.category ?? ""}
                onChange={formik.handleChange}
              >
                <option value="">All</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <label htmlFor="subcat" className="label">
                Sub Category
              </label>
              <select
                name="subcat"
                id="subcat"
                className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
                value={formik.values.subcat ?? ""}
                onChange={formik.handleChange}
              >
                <option value="">None</option>
                {categories
                  .filter((cat) => cat.id !== formik.values.category)
                  .map((cat, index) => (
                    <option key={index} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mt-4">
              <label htmlFor="publish" className="label">
                Publish Settings
              </label>
              <select
                id="publish"
                className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
                value={formik.values.frozen ? "private" : ""}
                onChange={(e) => {
                  formik.setFieldValue("frozen", e.target.value == "private");
                }}
              >
                <option value="">Public</option>
                <option value="private">Private</option>
              </select>
              {/* <input
							name="publish"
							type="text"
							id="publish"
							className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
							required
							onChange={formik.handleChange}
							value={formik.values.publish ?? ''}
						/> */}
            </div>
            <div className="mt-4">
              <label htmlFor="name" className="label">
                Room Name
              </label>
              <input
                name="name"
                type="text"
                id="name"
                className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
                required
                onChange={formik.handleChange}
                value={formik.values.name ?? ""}
              />
            </div>
            <div className="mt-4">
              <label className="custom-label">
                <div className="bg-white border dark:bg-slate-700 dark:border-slate-600 border-slate-200 rounded w-4 h-4  inline-block leading-4 text-center -mb-[3px] mr-1">
                  <input
                    type="checkbox"
                    name="intractable"
                    className="hidden peer"
                    value="yes"
                    checked={formik.values.intractable == "yes"}
                    onChange={formik.handleChange}
                  />
                  <FaCheck className="hidden peer-checked:block text-xs text-slate-700 dark:text-slate-300" />
                </div>
                <span className="text-sm text-slate-500 font-medium">
                  Intractable Disease
                </span>
              </label>
            </div>
            <div className="mt-4">
              <label htmlFor="description" className="label">
                Room Description
              </label>
              <textarea
                name="description"
                id="name"
                className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
                required
                onChange={formik.handleChange}
                value={formik.values.description ?? ""}
                rows={4}
              />
            </div>
            <div className="mt-4">
              <label className="label">Room Icon</label>
              <div className="preview-box block justify-center rounded overflow-hidden bg-slate-50 dark:bg-slate-900/20 p-4 mb-4 relative">
                {preview && !clearMessage && (
                  <Image
                    className="object-cover"
                    src={preview}
                    alt="Banner"
                    width={300}
                    height={300}
                  />
                )}
                {preview && !clearMessage && (
                  <div className="absolute right-0 top-0">
                    <TbX
                      className="cursor-pointer"
                      onClick={removeImage}
                      size={24}
                    />
                  </div>
                )}
              </div>
              <input
                type="file"
                id="input-file"
                accept="image/*"
                onChange={(e) => uploadImage(e.target.files![0])}
                hidden
              />
              <label
                className="btn-upload px-3 py-2 lg:px-4 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 mt-4"
                htmlFor="input-file"
              >
                Upload Image
              </label>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <form>
              <label htmlFor="name" className="label">
                Room Questionnaire
              </label>
              <input
                type="text"
                className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
                required
                placeholder="Enter new questionnaire"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                onKeyDown={onAddQuestion}
              />
            </form>
            <div>
              {questions.length > 0 ? (
                <ol className="list-none list-inside mt-5">
                  {questions.map((question, index) => (
                    <li
                      key={index}
                      className="p-2 text-slate-700 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700 justify-between flex items-start"
                    >
                      <div>
                        {editQuestion === index ? (
                          <input
                            className="ring-0 outline-none text-slate-900"
                            type="text"
                            required
                            value={updateQuestion}
                            onChange={(e) => setUpdateQuestion(e.target.value)}
                          />
                        ) : (
                          <>{question.question}</>
                        )}
                      </div>
                      <div>
                        {editQuestion === index ? (
                          <>
                            <TbCheck
                              className="inline-block text-xl"
                              onClick={() => {
                                onUpdateQuestion(question.id);
                              }}
                            />
                            <TbX
                              className="inline-block text-xl ml-2.5"
                              onClick={onCancelEditQuestion}
                            />
                          </>
                        ) : (
                          <>
                            <TbEdit
                              className="inline-block text-xl"
                              onClick={() => {
                                onEditQuestion(index);
                              }}
                            />
                            <TbTrash
                              className="inline-block text-xl ml-2.5"
                              onClick={() => {
                                onRemoveQuestion(question.id);
                              }}
                            />
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <></>
              )}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div>
              <label className="label">Room Tags</label>
              {tags.map((tag, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => onToggleTagSelect(tag.id)}
                  className={`text-sm font-medium  px-3 py-2 mr-2  mb-2 rounded ${
                    tagSelected(tag.id)
                      ? "text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-700"
                      : "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div>
              <label htmlFor="billable" className="label">
                Billing Settings
              </label>
              <select
                id="billable"
                className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
                value={formik.values.billable ? "on" : ""}
                onChange={(e) => {
                  formik.setFieldValue("billable", e.target.value == "on");
                }}
              >
                <option value="">Off</option>
                <option value="on">On</option>
              </select>
            </div>
            {formik.values.billable && (
              <>
                <div className="mt-4">
                  <label htmlFor="price" className="label">
                    Price
                  </label>
                  <select
                    id="price"
                    name="price"
                    className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
                    value={formik.values.price ?? "500"}
                    onChange={formik.handleChange}
                  >
                    <option value="100">100</option>
                    <option value="300">300</option>
                    <option value="500">500</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label htmlFor="price_desc" className="label">
                    Explanatory text
                  </label>
                  <textarea
                    id="price_desc"
                    name="price_desc"
                    className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
                    value={formik.values.price_desc ?? ""}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="checkout_url" className="label">
                    Billing URL
                  </label>
                  <input
                    name="checkout_url"
                    id="checkout_url"
                    className="form-control dark:bg-slate-800/60 dark:border-slate-700/50"
                    required
                    readOnly
                    value={formik.values.checkout_url ?? ""}
                  />
                </div>
                <button
                  className="px-3 py-2 lg:px-4 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 mt-4"
                  type="button"
                  onClick={onGenerateURL}
                >
                  URL generation
                </button>
              </>
            )}
          </>
        );
      default:
        return (
          <>
            <div className="">
              <label htmlFor="term" className="label">
                Terms of Room
              </label>
              <textarea
                name="terms"
                id="terms"
                className="form-control dark:bg-slate-800/60 dark:border-slate-700/50 h-80"
                required={formik.values.isCustomTerm == "yes"}
                onChange={formik.handleChange}
                value={formik.values.terms ?? ""}
              />
            </div>
            <div className="mt-4 flex items-center">
              <label className="custom-label">
                <div className="bg-white border dark:bg-slate-700 dark:border-slate-600 border-slate-200 rounded w-4 h-4  inline-block leading-4 text-center -mb-[3px] mr-1">
                  <input
                    type="checkbox"
                    name="isCustomTerm"
                    className="hidden peer"
                    value="yes"
                    checked={formik.values.isCustomTerm != "yes"}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "isCustomTerm",
                        e.target.checked ? "" : "yes"
                      )
                    }
                  />
                  <FaCheck className="hidden peer-checked:block text-xs text-slate-700 dark:text-slate-300" />
                </div>
                <span className="text-sm text-slate-500 font-medium">
                  Use basic terms of ROOM
                </span>
              </label>
              <TbInfoCircle
                className="ml-1"
                onClick={() => setShowBasicTerm(true)}
              />
            </div>
          </>
        );
    }
  };

  const renderControls = () => {
    switch (step) {
      case 1:
        return (
          <>
            <button
              onClick={hideModal}
              type="button"
              className="focus:outline-none text-white bg-red-500 hover:bg-red-600  font-medium rounded text-sm px-3 py-2 mr-2 dark:bg-red-500 dark:hover:bg-red-600  close"
            >
              Close
            </button>
            <button
              onClick={nextStep}
              type="button"
              className="text-white bg-blue-500 hover:bg-blue-600  font-medium rounded text-sm px-3 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none  my-auto"
            >
              Next
            </button>
          </>
        );
      case 2:
      case 3:
      case 4:
        return (
          <>
            <button
              onClick={prevStep}
              type="button"
              className="focus:outline-none text-white bg-red-500 hover:bg-red-600  font-medium rounded text-sm px-3 py-2 mr-2 dark:bg-red-500 dark:hover:bg-red-600  close"
            >
              Prev
            </button>
            <button
              onClick={nextStep}
              type="button"
              className="text-white bg-blue-500 hover:bg-blue-600  font-medium rounded text-sm px-3 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none  my-auto"
            >
              Next
            </button>
          </>
        );
      default:
        return (
          <>
            <button
              onClick={prevStep}
              type="button"
              className="focus:outline-none text-white bg-red-500 hover:bg-red-600  font-medium rounded text-sm px-3 py-2 mr-2 dark:bg-red-500 dark:hover:bg-red-600  close"
            >
              Prev
            </button>
            <button
              form="room-info-form"
              type="submit"
              className="text-white bg-blue-500 hover:bg-blue-600  font-medium rounded text-sm px-3 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none  my-auto"
            >
              Save
            </button>
          </>
        );
    }
  };

  return (
    <>
      <div className="modal-overlay"></div>
      <div className="modal fade block">
        <div className="modal-dialog modal-dialog-center">
          <div className="modal-content max-h-full overflow-y-auto">
            <div className="modal-header">
              <h6 className="modal-title">Room Modal</h6>
              <button type="button" className="btn-close" onClick={hideModal}>
                &times;
              </button>
            </div>
            <div className="modal-body text-muted leading-relaxed">
              <form
                ref={fomrRef}
                className="p-6"
                onSubmit={formik.handleSubmit}
                id="room-info-form"
              >
                {renderStep()}
              </form>
            </div>
            <div className="modal-footer">{renderControls()}</div>
          </div>
        </div>
      </div>

      {showBasicTerm && (
        <BasicTermsModal onCloseModal={() => setShowBasicTerm(false)} />
      )}
    </>
  );
};

export default RoomInfoModal;
