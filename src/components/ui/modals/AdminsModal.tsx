import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import { ErrorMessage, Field, FieldArray, Formik, useFormik } from "formik";
import { listHospitals } from "@/graphql/queries";
import { useChatClient } from "@/lib/getstream/context";
import Spinner from "@/components/ui/Spinner";
import Image from "next/image";
import { Auth, Storage, API } from "aws-amplify";
import { BsTrash } from "react-icons/bs";
import { useAuth } from "@/lib/hooks/useAuth";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingIndicator } from "stream-chat-react";
import { TbTrash } from "react-icons/tb";

Modal.setAppElement("#__next");

const AdminsModal: React.FC<{ onToggleMenu: Function }> = ({
  onToggleMenu,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const currentUser = useAuth();
  const [hasMore, setHasMore] = useState(true);
  const [nextToken, setNextToken] = useState("");
  const [users, setUsers] = useState<Record<any, any>[]>([]);

  useEffect(() => {
    if (currentUser && users.length == 0) {
      loadUsers();
    }
  }, [currentUser]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const loadUsers = async () => {
    if (isLoading) return;
    setLoading(true);

    try {
      const res = await API.get("AdminQueries", "/listUsersInGroup", {
        queryStringParameters: {
          groupname: "Admins",
          token: nextToken,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession())
            .getAccessToken()
            .getJwtToken()}`,
        },
      });

      console.log(currentUser);

      const newUsers = res.Users.filter(
        (user: any) => user["Username"] !== currentUser?.username
      ).map((user: any) => {
        const attrs = user["Attributes"];
        let email;
        for (let i = 0; i < attrs.length; i++) {
          if (attrs[i].Name === "email") {
            email = attrs[i].Value;
          }
        }
        return {
          id: user["Username"],
          email: email,
        };
      });
      setUsers([...users, ...newUsers]);

      if (res.NextToken) {
        setNextToken(res.NextToken);
      } else {
        setHasMore(false);
      }
    } catch (e) {
      console.error(e);
      setHasMore(false);
    }
    setLoading(false);
  };

  const onRemoveUser = async (id: string) => {
    if (window.confirm("You want to remove this user?")) {
      try {
        const res = await API.post("AdminQueries", "/deleteUser", {
          body: {
            username: id,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `${(await Auth.currentSession())
              .getAccessToken()
              .getJwtToken()}`,
          },
        });

        setUsers(users.filter((user) => user.id !== id));
      } catch (e) {
        console.error(e);
      }
    }
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
        Other Admins ⭐️
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
                <h6 className="modal-title">Other Admins</h6>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body  text-muted leading-relaxed">
                <ul>
                  {users.map((user, index) => (
                    <li key={index} className="border-b flex items-center py-2">
                      <span className="mr-2.5">{user.email}</span>
                      <button
                        onClick={() => onRemoveUser(user.id)}
                        className="ml-auto"
                      >
                        <TbTrash />
                      </button>
                    </li>
                  ))}
                </ul>
                <InfiniteScroll
                  style={{ overflow: "unset" }}
                  dataLength={users.length}
                  next={loadUsers}
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
    </>
  );
};

export default AdminsModal;
