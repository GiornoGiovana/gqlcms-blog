import React, { useEffect, useRef, useState } from "react";
import { submitComment } from "../services";

interface CommentsFormProps {
  slug: string;
}

export const CommentsForm: React.FC<CommentsFormProps> = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const commentEl = useRef<HTMLTextAreaElement>(null);
  const nameEl = useRef<HTMLInputElement>(null);
  const emailEl = useRef<HTMLInputElement>(null);
  const storeDataEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    //@ts-ignore
    nameEl.current?.value = window.localStorage.getItem("name");
    //@ts-ignore
    emailEl.current?.value = window.localStorage.getItem("email");
  }, []);

  const addNewComment = () => {
    setError(false);

    const comment = commentEl.current?.value;
    const name = nameEl.current?.value;
    const email = emailEl.current?.value;
    const storeData = storeDataEl.current?.value;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = { name, email, comment, slug };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMsg(true);
      setTimeout(() => {
        setShowSuccessMsg(false);
      }, 3000);
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave a Reply
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100
            text-gray-700"
          placeholder="Comment"
          name="comment"
          ref={commentEl}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100
            text-gray-700"
          type="text"
          placeholder="Name"
          name="name"
          ref={nameEl}
        />
        <input
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100
            text-gray-700"
          type="email"
          placeholder="Email"
          name="email"
          ref={emailEl}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            className="text-gray-500 cursor-pointer ml-2"
            htmlFor="storeData"
          >
            Save my email and name for the next time I comment.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are required.</p>
      )}
      <div className="mt-8">
        <button
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full 
            text-white px-8 py-3 cursor-pointer"
          type="button"
          onClick={addNewComment}
        >
          Post Comment
        </button>
        {showSuccessMsg && (
          <span className="text-xl float-right font-semibold mt-3 text-green-500">
            Comment Submitted for review
          </span>
        )}
      </div>
    </div>
  );
};
