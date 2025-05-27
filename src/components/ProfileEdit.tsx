import apiClient from "@/lib/apiClient";
import { ProfileType } from "@/types";
import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const editProfile = async (
  username: string,
  bio: string | undefined,
  id: number
) => {
  try {
    await apiClient.put(`/users/profile/edit/${id}`, {
      username,
      bio,
    });
  } catch (error) {
    console.log(error);
  }
};

type Props = {
  profile: ProfileType;
};

const ProfileEdit = ({ profile }: Props) => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const bioRef = useRef<HTMLTextAreaElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (nameRef.current) {
      await editProfile(
        nameRef.current.value,
        bioRef.current?.value,
        profile.userId
      );

      router.reload();
    }
  };

  useEffect(() => {
    try {
      if (nameRef.current && bioRef.current) {
        nameRef.current.value = profile.user.username;
        bioRef.current.value = profile.bio;
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const outsideDialog = (e: any) => {
    console.log(e);
    if (dialogRef.current) {
      const dialogPosition = dialogRef.current.getBoundingClientRect();
      //モーダルの外の座標をクリックしたときモーダルを閉じる

      if (
        e.clientX < dialogPosition.left ||
        e.clientX > dialogPosition.right ||
        e.clientY < dialogPosition.top ||
        e.clientY > dialogPosition.bottom
      ) {
        dialogRef.current.close();
      }
    }
  };

  return (
    <div>
      <button
        id="btn"
        onClick={openDialog}
        className="text-black border-slate-400 border-solid  border px-2 py-1 rounded-full hover:bg-slate-200 cursor-pointer transition-all duration-300"
      >
        編集
      </button>
      <dialog
        onClick={outsideDialog}
        ref={dialogRef}
        id="dialog"
        className="container bg-black border-none rounded-lg w-dvw h-dvh md:w-2/5 md:h-3/4 z-10 backdrop:bg-slate-700 backdrop:opacity-60"
      >
        <div className="m-2 flex flex-col">
          <div className="flex justify-between items-center mx-1">
            <div className="flex items-center">
              <button
                id="modalBtn"
                onClick={closeDialog}
                className="w-8 h-8 rounded-full hover:bg-slate-800 cursor-pointer transition-all duration-300"
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="align-[-1px] text-lg font-semibold text-white fa-solid fa-xmark"
                />
              </button>
              <h1 className="text-white ml-5 font-medium text-lg">
                Edit profile
              </h1>
            </div>
            <button
              form="edit-profile"
              type="submit"
              disabled={nameRef.current?.value === ""}
              className="p-1 w-16 font-semibold bg-white rounded-full text-black"
            >
              save
            </button>
          </div>
          <form
            id="edit-profile"
            className="flex flex-col space-y-9 mt-9 mx-3"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <label htmlFor="name" className="text-white">
                Name
              </label>
              <input
                ref={nameRef}
                type="text"
                name="name"
                id="name"
                className="mb-1 rounded border-solid border-2 border-sky-500 bg-slate-900 text-white"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="bio" className="text-white">
                Bio
              </label>
              <textarea
                ref={bioRef}
                name="bio"
                id="bio"
                rows={3}
                cols={10}
                className="resize-none rounded border-solid border-2 border-sky-500 bg-slate-900 text-white"
              ></textarea>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ProfileEdit;
