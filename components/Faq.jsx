import React from "react";
import { FaArrowDown } from "react-icons/fa";

const Faq = () => {
  return (
    <section id="faq" class="faq-area">
      <div class="container">
        <div class="faq-inner-wrap">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-title text-center mb-70">
                <h2 class="title">Ask Quick Question</h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="faq-wrap">
                <div class="accordion" id="accordionExample">

                  <div class="accordion-item active">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button d-flex justify-content-between align-items-center"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <span>What cryptocurrencies can I use to purchase?</span>
                        <span className="faq-arrow-icon">
                          <FaArrowDown />
                        </span>
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      class="accordion-collapse collapse show"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <p>
                          LessAccounting is 100% web-based, meaning it can be
                          accessed from anywhere and there’s no software to
                          install on your computer.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed d-flex justify-content-between align-items-center"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        <span>What is the Amero X?</span>
                        <span className="faq-arrow-icon">
                          <FaArrowDown />
                        </span>
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <p>
                          LessAccounting is 100% web-based, meaning it can be
                          accessed from anywhere.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed d-flex justify-content-between align-items-center"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        <span>How can I connect API with my Current Site</span>
                        <span className="faq-arrow-icon">
                          <FaArrowDown />
                        </span>
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <p>
                          LessAccounting is 100% web-based and cloud accessible.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed d-flex justify-content-between align-items-center"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        <span>What is the Payment Method</span>
                        <span className="faq-arrow-icon">
                          <FaArrowDown />
                        </span>
                      </button>
                    </h2>
                    <div
                      id="collapseFour"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <p>
                          LessAccounting is accessible from anywhere with cloud
                          support.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed d-flex justify-content-between align-items-center"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFive"
                        aria-expanded="false"
                        aria-controls="collapseFive"
                      >
                        <span>What makes Less Accounting better than the rest?</span>
                        <span className="faq-arrow-icon">
                          <FaArrowDown />
                        </span>
                      </button>
                    </h2>
                    <div
                      id="collapseFive"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <p>
                          LessAccounting is fast, cloud-based, and mobile
                          friendly.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
