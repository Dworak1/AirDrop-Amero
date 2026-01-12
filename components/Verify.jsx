import React, { useState, useContext } from "react";
import { saveAs } from "file-saver";
import { BsLinkedin, BsTwitterX, BsInstagram } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";

import { HiOutlineClipboardDocument } from "react-icons/hi2";

import { MdMarkEmailRead } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { TwitterMomentShare } from "react-social-media-embed";

//INTERNAL IMPORT
import { Linkedin, Twitter, Instagram, Follow } from "./index";
import { CONTEXT } from "../context/index";
import { getXIdFromUrl, isValidLinkedInUrl } from "../Utils/index";

const Verify = () => {
  const handleImage = () => {
    let url = `airdrop.png`;
    saveAs(url, `@theblockchaincoders`);
  };

  const { claimAirdrop, notifyError, notifySuccess, address, connect, loader, claimStatus } =
    useContext(CONTEXT);

  const [user, setUser] = useState({
    name: "",
    twitterId: "",
    linkedInUrl: "",
    instagramUrl: "",
    email: "",
  });

  const [verifying, setVerifying] = useState(false);

  const handleFormFieldChange = (fieldName, e) => {
    let value = e.target.value;
    if (fieldName === "twitterId") {
      const id = getXIdFromUrl(value);
      if (id) value = id;
    }
    setUser({ ...user, [fieldName]: value });
  };

  const CALLING_AIRDROP = async () => {
    const { name, twitterId, linkedInUrl, instagramUrl, email } = user;

    console.log(user);

    if (!name || !linkedInUrl || !instagramUrl || !twitterId || !email) {
      return notifyError("Provide all details to claim airdrop");
    }

    // Verification
    if (!/^\d+$/.test(twitterId)) {
      return notifyError("Invalid X Link (Must be a Post URL)");
    }

    // LinkedIn: Check for specific post markers like /posts/, /feed/update/, or /activity/
    const linkedInPattern = /linkedin\.com\/(feed\/update\/|posts\/|activity\/)/;
    if (!linkedInPattern.test(linkedInUrl)) {
      return notifyError("Invalid LinkedIn Post Link (Must be a specific post)");
    }

    // Instagram: Check for /p/ (post) or /reel/ 
    const instagramPattern = /instagram\.com\/(p|reel)\//;
    if (!instagramPattern.test(instagramUrl)) {
      return notifyError("Invalid Instagram Post Link (Must be a specific post)");
    }

    if (!email.includes("@") || !email.includes(".")) {
      return notifyError("Invalid Email Address");
    }

    setVerifying(true);
    notifySuccess("Verifying Post Details...");

    try {
      // Reconstruct URL for verification API (since we only stored the ID)
      const verificationUrl = `https://twitter.com/i/status/${twitterId}`;

      const response = await fetch('/api/verify-tweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: verificationUrl }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      setVerifying(false);
      notifySuccess("Posts Verified Successfully!");

      await claimAirdrop(user);
    } catch (error) {
      setVerifying(false);
      console.error(error);
      notifyError(error.message || "Verification Failed");
    }
  };

  console.log(claimStatus);

  return (
    <section class="contact-area pt-140 pb-140">
      <div class="container">
        <div class="contact-info-wrap">
          <div class="row justify-content-center">
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="contact-info-item">
                <div class="icon">
                  <i class="fas ">
                    <BsTwitterX />
                  </i>
                </div>
                <div class="content">
                  <h6 class="title">X </h6>
                  <Twitter
                    user={user}
                    handleClick={(e) => handleFormFieldChange("twitterId", e)}
                  />
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="contact-info-item">
                <div class="icon">
                  <i class="fas ">
                    <BsLinkedin />
                  </i>
                </div>

                <div class="content">
                  <h6 class="title">Linkedin</h6>

                  <Linkedin
                    user={user}
                    handleClick={(e) => handleFormFieldChange("linkedInUrl", e)}
                  />
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="contact-info-item">
                <div class="icon">
                  <i class="fas ">
                    <BsInstagram />
                  </i>
                </div>
                <div class="content">
                  <h6 class="title">Instagram</h6>

                  <Instagram
                    user={user}
                    handleClick={(e) =>
                      handleFormFieldChange("instagramUrl", e)
                    }
                  />
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="contact-info-item">
                <div class="icon">
                  <i class="fas ">
                    <FaUser />
                  </i>
                </div>
                <div class="content">
                  <h6 class="title">Email</h6>
                  <Follow
                    name={"Name"}
                    handleClick={(e) => handleFormFieldChange("name", e)}
                  />
                  <Follow
                    name={"Email"}
                    handleClick={(e) => handleFormFieldChange("email", e)}
                  />

                  {address != "" && claimStatus == true ? (
                    <button class="btn margin-btn-new">
                      {loader ? "loading..." : "Already Claim Airdrop"}
                    </button>
                  ) : address != "" && claimStatus == false ? (
                    <button
                      onClick={() => CALLING_AIRDROP()}
                      class="btn margin-btn-new"
                    >
                      {loader || verifying ? "loading..." : "Clain  Airdrop"}
                    </button>
                  ) : (
                    <button
                      onClick={() => connect()}
                      class="btn margin-btn-new"
                    >
                      Connect Wallet
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="contact-form-wrap">
          <div class="row g-0">
            <div class="col-57 order-0 order-lg-2">
              <div class="contact-form">
                <h4 class="title">Post Details</h4>
                <div id="contact-form">
                  <div class="row">
                    <div class="col-md-6 ">
                      <HiOutlineClipboardDocument
                        className="new-cursour"
                        onClick={(e) =>
                          navigator.clipboard.writeText("X @TheBCoders")
                        }
                      />
                      <div
                        class="form-grp"
                        onClick={(e) =>
                          navigator.clipboard.writeText("Twitter @TheBCoders")
                        }
                      >
                        <input
                          type="text"
                          disabled
                          placeholder="X @TheBCoders"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <HiOutlineClipboardDocument
                        className="new-cursour"
                        onClick={(e) =>
                          navigator.clipboard.writeText(
                            "Instgram: @daulathussain92"
                          )
                        }
                      />
                      <div class="form-grp">
                        <input
                          type="text"
                          disabled
                          placeholder="Instgram: @daulathussain92"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <HiOutlineClipboardDocument
                        className="new-cursour"
                        onClick={(e) =>
                          navigator.clipboard.writeText(
                            "@theblockchaincoders Coin"
                          )
                        }
                      />
                      <div class="form-grp">
                        <input
                          type="text"
                          disabled
                          placeholder="@theblockchaincoders Coin"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <HiOutlineClipboardDocument
                        className="new-cursour"
                        onClick={(e) =>
                          navigator.clipboard.writeText(
                            "Website: https://www.theblockchaincoders.com/"
                          )
                        }
                      />
                      <div class="form-grp">
                        <input
                          type="text"
                          disabled
                          placeholder="Website: https://www.theblockchaincoders.com/"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-grp">
                    <HiOutlineClipboardDocument
                      className="new-cursour"
                      onClick={(e) =>
                        navigator.clipboard.writeText(
                          "🚀 Join the revolution! Introducing @AmeroX! The future of decentralized finance. 💡 Invest in positive change. 🌍 #amerox #crypto #blockchain #airdrop 🌟🔗"
                        )
                      }
                    />
                    <textarea
                      name="message"
                      disabled
                      placeholder="🚀 Join the revolution! Introducing @AmeroX! The future of decentralized finance. 💡 Invest in positive change. 🌍 #amerox #crypto #blockchain #airdrop 🌟🔗"
                    ></textarea>
                  </div>
                  <button onClick={() => handleImage()} class="btn">
                    Download Image
                  </button>
                </div>
                <p class="ajax-response mb-0"></p>
              </div>
            </div>
            <div class="col-43">
              <div class="contact-map">
                <img src="airdrop.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Verify;
