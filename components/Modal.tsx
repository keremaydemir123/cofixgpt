"use client";

import React from "react";
import PaperPlane from "@/icons/PaperPlane";
import CloseIcon from "@/icons/CloseIcon";

function Modal() {
  const [isOpen, setIsOpen] = React.useState(true);
  if (!isOpen) return null;
  return (
    <div className="w-full h-hull fixed top-0 left-0 bottom-0 right-0 bg-black/60 flex justify-center items-center z-100">
      <div className="prose relative w-4/5 md:w-1/2 max-h-max bg-base-100 p-8 rounded-md over">
        <CloseIcon
          onClick={() => setIsOpen(false)}
          className="w-8 h-8 text-black absolute top-4 right-4 cursor-pointer hover:text-black/60"
        />
        <div className="w-full max-h-96 overflow-y-auto">
          <h2 className="mt-0">
            <span>Hi!👋</span>
            <span>Welcome to </span>
            <span className="text-primary">CoFixGPT</span>
          </h2>
          <p>
            This is a simple GPT-3 powered app that can help you generate
            better-looking code.
          </p>
          <p>
            You can use it to make your code look more professional and solve
            your code problems with a single click.
          </p>

          <p>
            Remind that, CoFixGPT is in{" "}
            <strong className="italic text-secondary">Beta.</strong> That means
            that it&apos;s not perfect yet.
          </p>
          <p>
            If you find any bugs, or have any suggestions, please let me know on{" "}
            <a
              href="https://twitter.com/KeremAydem1r"
              target="_blank"
              rel="noreferrer"
              className="text-accent"
            >
              Twitter
            </a>
          </p>

          <p>
            If you want to support me, you can{" "}
            <a
              href="https://www.buymeacoffee.com/keremaydemir"
              target="_blank"
              rel="noreferrer"
              className="text-accent"
            >
              buy me a coffee
            </a>
          </p>

          <h2>Here is how you can test CoFixGPT:</h2>
          <ol>
            <li>
              Upload your html, css and javascript files For now, CoFixGPT only
              supports <strong className="text-secondary">.html</strong>,{" "}
              <strong className="text-secondary">.css</strong> and{" "}
              <strong className="text-secondary">.js</strong> files also make
              sure that your files are not too big for test purposes, you can
              use the files from the{" "}
              <a
                href="https://drive.google.com/file/d/1x9jraONm84fK5_CJUnnfQTL67Cgr6WZu/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="text-accent"
              >
                example
              </a>
            </li>
            <li>
              Click on the <strong className="text-secondary">New Chat</strong>{" "}
              button
            </li>
            <li>
              Select one of the modifiers{" "}
              <strong className="text-secondary underline">Fix</strong>,{" "}
              <strong className="text-secondary underline">Refactor</strong> or{" "}
              <strong className="text-secondary underline">Add Comments</strong>{" "}
              underline
            </li>
            <li>
              Optionally you can add additional prompt text to help the model
              generate better code
            </li>
            <li>
              Click on the <PaperPlane className="w-6 h-6 inline" /> icon
            </li>
            <li>Wait for the model to generate the code</li>
            <li>
              You can visit the chat page by clicking the related file on the
              sidebar to see the generated code
            </li>
          </ol>

          <h2>Current bugs and limitations</h2>
          <ul>
            <li>Only 1 request a day</li>
            <li>
              Input prompt of individual files are disabled at the moment, they
              will be available next pathc
            </li>
            <li>Only .html, .css and .js files are supported</li>
            <li>You have to upload minimum of 3 files to work</li>
            <li>Code generation can be slow</li>
            <li>Page transitions can be buggy</li>
            <li>Mobile desing is 💩</li>
          </ul>

          <h2>What&apos;s next?</h2>
          <ul>
            <li>Jsx,ts, tsx files will be available</li>
            <li>Input prompt of individual files will be available</li>
            <li>You will be able to select more than one modifier</li>
            <li>More modifiers will be available</li>
            <li>Requests for a day will be more flexible</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Modal;
