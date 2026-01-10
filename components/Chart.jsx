import React from "react";

const Chart = () => {
  return (
    <div id="chart" class="chart-area pt-140">
      <div class="container">
        <div class="chart-inner-wrap">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="chart-wrap">
                <div class="chart">
                  <canvas id="doughnutChart"></canvas>
                </div>
                <div class="chart-tab">
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link active"
                        id="funding-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#funding-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="funding-tab-pane"
                        aria-selected="true"
                      >
                        Funding Allocation
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="token-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#token-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="token-tab-pane"
                        aria-selected="false"
                      >
                        Token Distribution
                      </button>
                    </li>
                  </ul>
                  <div class="tab-content" id="myTabContent">
                    <div
                      class="tab-pane fade show active"
                      id="funding-tab-pane"
                      role="tabpanel"
                      aria-labelledby="funding-tab"
                      tabindex="0"
                    >
                      <div class="chart-list">
                        <ul class="list-wrap">
                          <li>Contingency: 70%</li>
                          <li>Business Development: 20%</li>
                          <li>Investor: 30%</li>
                          <li>Poland: 15%</li>
                          <li>Legal & Regulation: 20%</li>
                          <li>Czech Republic: 50%</li>
                        </ul>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="token-tab-pane"
                      role="tabpanel"
                      aria-labelledby="token-tab"
                      tabindex="0"
                    >
                      <div class="chart-list">
                        <ul class="list-wrap">
                          <li>Contingency: 70%</li>
                          <li>Business Development: 20%</li>
                          <li>Investor: 30%</li>
                          <li>Poland: 15%</li>
                          <li>Legal & Regulation: 20%</li>
                          <li>Czech Republic: 50%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="right-side-content">
                <img src="assets/img/images/chart_img.png" alt="" />
                <p>
                  Ethereum is a decentralized, open-source <br />
                  blockchain with smart contract
                </p>
                <ul class="list-wrap">
                  <li>
                    <span>1</span>Symbol: AMX
                  </li>
                  <li>
                    <span>2</span>Initial Value : 1 USDC = 1 USD = 1 AMX
                  </li>
                  <li>
                    <span>3</span>Type : BEP 20 and AMX 20
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
