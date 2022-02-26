import React from "react";
import { Link } from "react-router-dom";
import { useAuthentication } from "../auth/authenticationSlice";

export function Home() {
    const {
        authentication: { token },
      } = useAuthentication();
  return (
    <>
      <div>
        <div className="mt-32 flex justify-between ">
          <section className="hero-info">
            <h1 className=" text-6xl font-semibold leading-tight">
              Connect with the world on <br />{" "}
              <span style={{ color: "#fe656b" }}>CORAL-gram</span>
            </h1>
            <Link to={token? "/" : "/login"}>
              <button className="bg-primaryCoral text-white font-semibold tracking-wide  py-4 px-5 rounded-full text-2xl uppercase shadow-lg mt-4 hover:bg-red-500">
                Connect now
              </button>
            </Link>
          </section>

          <img
            className="w-1/2"
            src="Images/heroImg.png"
            alt="3D person facing right"
          />
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 bg-[#0f3644] w-screen text-primaryCoral text-center p-4">
        Made with ❤ by Madhushree Kunder
      </footer>
    </>
  );
}
