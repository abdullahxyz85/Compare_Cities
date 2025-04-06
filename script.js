document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const compareBtn = document.getElementById("compareBtn");
  const resultsSection = document.getElementById("results");
  const city1Input = document.getElementById("city1");
  const city2Input = document.getElementById("city2");
  const city1Name = document.getElementById("city1Name");
  const city2Name = document.getElementById("city2Name");
  const city1Labels = document.querySelectorAll('[id^="city1Label"]');
  const city2Labels = document.querySelectorAll('[id^="city2Label"]');
  const reviewForm = document.getElementById("reviewForm");
  const travelPlanBtn = document.getElementById("travelPlanBtn");
  const chartTabs = document.querySelectorAll(".chart-tab");

  // Chart instances
  let barComparisonChart = null;
  let costTrendChart = null;
  let transportChart1 = null;
  let transportChart2 = null;

  // Initialize all charts
  initAllCharts();

  // Add comparison functionality
  compareBtn.addEventListener("click", function () {
    if (city1Input.value.trim() === "" || city2Input.value.trim() === "") {
      alert("Please enter both cities to compare");
      return;
    }

    // Update city names in results
    const city1Value = city1Input.value;
    const city2Value = city2Input.value;

    city1Name.textContent = city1Value;
    city2Name.textContent = city2Value;

    // Update all city labels
    city1Labels.forEach((label) => {
      label.textContent = city1Value;
    });

    city2Labels.forEach((label) => {
      label.textContent = city2Value;
    });

    // Update chart tab labels
    document.querySelectorAll('[id^="city1"]').forEach((el) => {
      if (el.id.includes("TabLabel") || el.id.includes("TransportLabel")) {
        el.textContent = city1Value;
      }
    });

    document.querySelectorAll('[id^="city2"]').forEach((el) => {
      if (el.id.includes("TabLabel") || el.id.includes("TransportLabel")) {
        el.textContent = city2Value;
      }
    });

    // In a real application, we would fetch actual data here
    // For demo, we'll simulate loading and show pre-populated data
    compareBtn.textContent = "Loading...";
    compareBtn.disabled = true;

    setTimeout(() => {
      // Scroll to results with smooth animation
      resultsSection.classList.add("fade-in");
      resultsSection.scrollIntoView({ behavior: "smooth" });

      // Reset button
      compareBtn.textContent = "Compare Now";
      compareBtn.disabled = false;

      // Update charts with new data
      updateAllCharts(city1Value, city2Value);
    }, 1500);
  });

  // Chart tab functionality
  chartTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const cityNumber = this.getAttribute("data-city");
      const chartType = this.getAttribute("data-chart") || "profession";
      const tabGroup = this.parentElement;

      // Remove active class from all tabs in this group
      tabGroup.querySelectorAll(".chart-tab").forEach((t) => {
        t.classList.remove("active");
      });

      // Add active class to clicked tab
      this.classList.add("active");

      // Show corresponding chart content
      const contentId =
        chartType === "transport"
          ? `transportChartContainer${cityNumber}`
          : `professionChartContainer${cityNumber}`;

      const chartContents = tabGroup
        .closest(".chart-section")
        .querySelectorAll(".chart-content");
      chartContents.forEach((content) => {
        content.classList.remove("active");
      });

      document.getElementById(contentId).classList.add("active");
    });
  });

  // Handle review form submission
  if (reviewForm) {
    reviewForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const city = document.getElementById("reviewCity").value;
      const rating = document.getElementById("reviewRating").value;
      const text = document.getElementById("reviewText").value;

      // In a real app, we would submit this data to a server
      alert(`Thank you for your review of ${city}!`);

      // Reset form
      reviewForm.reset();
    });
  }

  // Travel plan button
  if (travelPlanBtn) {
    travelPlanBtn.addEventListener("click", function () {
      // Check if cities have been entered
      if (city1Input.value.trim() === "" || city2Input.value.trim() === "") {
        alert("Please enter cities to compare before creating a travel plan");
        city1Input.focus();
        return;
      }

      alert(
        `Creating travel plan for ${city1Input.value} and ${city2Input.value}...`
      );
      // In a real app, this would navigate to a travel planning page
    });
  }

  // Initialize all charts
  function initAllCharts() {
    initProfessionCharts();
    initTransportCharts();
    initBarComparisonChart();
    initCostTrendChart();
  }

  // Update all charts with new data
  function updateAllCharts(city1, city2) {
    updateProfessionCharts(city1, city2);
    updateTransportCharts(city1, city2);
    updateBarComparisonChart(city1, city2);
    updateCostTrendChart(city1, city2);
    updateComparisonData(city1, city2);
  }

  // Initialize profession charts
  function initProfessionCharts() {
    // Chart for City 1
    const ctx1 = document.getElementById("professionChart1");
    if (ctx1) {
      new Chart(ctx1, {
        type: "pie",
        data: {
          labels: ["Tech", "Healthcare", "Education", "Manufacturing", "Other"],
          datasets: [
            {
              data: [30, 20, 15, 25, 10],
              backgroundColor: [
                "#4a6fff",
                "#14b8a6",
                "#f59e0b",
                "#ef4444",
                "#8b5cf6",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: {
                color: "#333",
                font: {
                  size: 11,
                },
              },
            },
          },
        },
      });
    }

    // Chart for City 2
    const ctx2 = document.getElementById("professionChart2");
    if (ctx2) {
      new Chart(ctx2, {
        type: "pie",
        data: {
          labels: ["Tech", "Healthcare", "Education", "Manufacturing", "Other"],
          datasets: [
            {
              data: [45, 15, 20, 10, 10],
              backgroundColor: [
                "#4a6fff",
                "#14b8a6",
                "#f59e0b",
                "#ef4444",
                "#8b5cf6",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: {
                color: "#333",
                font: {
                  size: 11,
                },
              },
            },
          },
        },
      });
    }
  }

  // Initialize transport usage charts
  function initTransportCharts() {
    // Chart for City 1 Transport
    const transportCtx1 = document.getElementById("transportChart1");
    if (transportCtx1) {
      transportChart1 = new Chart(transportCtx1, {
        type: "doughnut",
        data: {
          labels: ["Bus", "Metro/Subway", "Car", "Bike", "Walking"],
          datasets: [
            {
              data: [25, 30, 35, 5, 5],
              backgroundColor: [
                "#3b82f6", // Blue
                "#8b5cf6", // Purple
                "#f59e0b", // Orange
                "#10b981", // Green
                "#6b7280", // Gray
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "65%",
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 15,
                font: {
                  size: 12,
                },
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return ` ${context.label}: ${context.raw}%`;
                },
              },
            },
          },
          animation: {
            animateScale: true,
            animateRotate: true,
            duration: 1000,
          },
        },
      });
    }

    // Chart for City 2 Transport
    const transportCtx2 = document.getElementById("transportChart2");
    if (transportCtx2) {
      transportChart2 = new Chart(transportCtx2, {
        type: "doughnut",
        data: {
          labels: ["Bus", "Metro/Subway", "Car", "Bike", "Walking"],
          datasets: [
            {
              data: [15, 45, 20, 10, 10],
              backgroundColor: [
                "#3b82f6", // Blue
                "#8b5cf6", // Purple
                "#f59e0b", // Orange
                "#10b981", // Green
                "#6b7280", // Gray
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "65%",
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                padding: 15,
                font: {
                  size: 12,
                },
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return ` ${context.label}: ${context.raw}%`;
                },
              },
            },
          },
          animation: {
            animateScale: true,
            animateRotate: true,
            duration: 1000,
          },
        },
      });
    }
  }

  // Initialize bar comparison chart
  function initBarComparisonChart() {
    const barCtx = document.getElementById("barComparisonChart");
    if (barCtx) {
      barComparisonChart = new Chart(barCtx, {
        type: "bar",
        data: {
          labels: [
            "Cost of Living",
            "Housing",
            "Groceries",
            "Transport",
            "Pollution",
            "Population Density",
          ],
          datasets: [
            {
              label: "City 1",
              data: [65, 70, 60, 50, 40, 55],
              backgroundColor: "rgba(59, 130, 246, 0.7)",
              borderColor: "rgba(59, 130, 246, 1)",
              borderWidth: 1,
            },
            {
              label: "City 2",
              data: [80, 85, 75, 60, 65, 75],
              backgroundColor: "rgba(249, 115, 22, 0.7)",
              borderColor: "rgba(249, 115, 22, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: "y",
          scales: {
            x: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: function (value) {
                  return value + "/100";
                },
              },
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              position: "top",
              labels: {
                boxWidth: 15,
                padding: 15,
              },
            },
            tooltip: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleFont: { size: 14 },
              bodyFont: { size: 13 },
              callbacks: {
                label: function (context) {
                  return ` ${context.dataset.label}: ${context.raw}/100`;
                },
              },
            },
          },
          animation: {
            delay: function (context) {
              return context.dataIndex * 100;
            },
            duration: 1000,
          },
        },
      });
    }
  }

  // Initialize cost trend chart
  function initCostTrendChart() {
    const trendCtx = document.getElementById("costTrendChart");
    if (trendCtx) {
      costTrendChart = new Chart(trendCtx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "City 1",
              data: [1200, 1250, 1280, 1310, 1340, 1370],
              borderColor: "rgba(59, 130, 246, 1)",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              tension: 0.4,
              fill: true,
            },
            {
              label: "City 2",
              data: [1800, 1820, 1860, 1900, 1950, 2000],
              borderColor: "rgba(249, 115, 22, 1)",
              backgroundColor: "rgba(249, 115, 22, 0.1)",
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              title: {
                display: true,
                text: "Cost ($)",
              },
              ticks: {
                callback: function (value) {
                  return "$" + value;
                },
              },
            },
          },
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return ` ${context.dataset.label}: $${context.raw}`;
                },
              },
            },
          },
          animation: {
            duration: 2000,
          },
        },
      });
    }
  }

  // Update charts with new data (simulated)
  function updateProfessionCharts(city1, city2) {
    // Get chart instances
    const chart1 = Chart.getChart("professionChart1");
    const chart2 = Chart.getChart("professionChart2");

    if (chart1) {
      // Generate somewhat random but reasonable data
      let data1;
      if (
        city1.toLowerCase().includes("new york") ||
        city1.toLowerCase().includes("san francisco")
      ) {
        data1 = [45, 15, 20, 5, 15]; // Tech-heavy cities
      } else if (
        city1.toLowerCase().includes("boston") ||
        city1.toLowerCase().includes("rochester")
      ) {
        data1 = [25, 35, 20, 10, 10]; // Healthcare-heavy cities
      } else {
        data1 = [
          Math.floor(Math.random() * 30) + 10,
          Math.floor(Math.random() * 25) + 10,
          Math.floor(Math.random() * 20) + 10,
          Math.floor(Math.random() * 20) + 5,
          Math.floor(Math.random() * 15) + 5,
        ];
        // Normalize to 100%
        const sum = data1.reduce((a, b) => a + b, 0);
        data1 = data1.map((value) => Math.round((value / sum) * 100));
      }

      chart1.data.datasets[0].data = data1;
      chart1.update();
    }

    if (chart2) {
      // Generate somewhat random but reasonable data for city2
      let data2;
      if (
        city2.toLowerCase().includes("new york") ||
        city2.toLowerCase().includes("san francisco")
      ) {
        data2 = [45, 15, 20, 5, 15]; // Tech-heavy cities
      } else if (
        city2.toLowerCase().includes("boston") ||
        city2.toLowerCase().includes("rochester")
      ) {
        data2 = [25, 35, 20, 10, 10]; // Healthcare-heavy cities
      } else {
        data2 = [
          Math.floor(Math.random() * 30) + 10,
          Math.floor(Math.random() * 25) + 10,
          Math.floor(Math.random() * 20) + 10,
          Math.floor(Math.random() * 20) + 5,
          Math.floor(Math.random() * 15) + 5,
        ];
        // Normalize to 100%
        const sum = data2.reduce((a, b) => a + b, 0);
        data2 = data2.map((value) => Math.round((value / sum) * 100));
      }

      chart2.data.datasets[0].data = data2;
      chart2.update();
    }

    // Update other comparison data
    updateComparisonData(city1, city2);
  }

  // Update transport charts based on cities
  function updateTransportCharts(city1, city2) {
    if (transportChart1) {
      let data1;

      // Simulating city-specific data
      if (city1.toLowerCase().includes("new york")) {
        data1 = [15, 55, 10, 10, 10]; // NYC is heavy on subway
      } else if (city1.toLowerCase().includes("los angeles")) {
        data1 = [20, 5, 65, 5, 5]; // LA is car dominant
      } else if (city1.toLowerCase().includes("amsterdam")) {
        data1 = [15, 20, 25, 30, 10]; // Amsterdam has lots of bikes
      } else {
        // Random data that adds up to 100%
        data1 = [
          Math.floor(Math.random() * 25) + 10,
          Math.floor(Math.random() * 25) + 10,
          Math.floor(Math.random() * 25) + 15,
          Math.floor(Math.random() * 15) + 5,
          Math.floor(Math.random() * 15) + 5,
        ];
        const sum = data1.reduce((a, b) => a + b, 0);
        data1 = data1.map((value) => Math.round((value / sum) * 100));
      }

      transportChart1.data.datasets[0].data = data1;
      transportChart1.update();
    }

    if (transportChart2) {
      let data2;

      if (city2.toLowerCase().includes("new york")) {
        data2 = [15, 55, 10, 10, 10];
      } else if (city2.toLowerCase().includes("los angeles")) {
        data2 = [20, 5, 65, 5, 5];
      } else if (city2.toLowerCase().includes("amsterdam")) {
        data2 = [15, 20, 25, 30, 10];
      } else {
        data2 = [
          Math.floor(Math.random() * 25) + 10,
          Math.floor(Math.random() * 25) + 10,
          Math.floor(Math.random() * 25) + 15,
          Math.floor(Math.random() * 15) + 5,
          Math.floor(Math.random() * 15) + 5,
        ];
        const sum = data2.reduce((a, b) => a + b, 0);
        data2 = data2.map((value) => Math.round((value / sum) * 100));
      }

      transportChart2.data.datasets[0].data = data2;
      transportChart2.update();
    }
  }

  // Update bar comparison chart with city data
  function updateBarComparisonChart(city1, city2) {
    if (barComparisonChart) {
      // Update labels
      barComparisonChart.data.datasets[0].label = city1;
      barComparisonChart.data.datasets[1].label = city2;

      // Generate city-specific or random data
      let data1 = [];
      let data2 = [];

      // Cost of Living
      if (
        city1.toLowerCase().includes("new york") ||
        city1.toLowerCase().includes("san francisco")
      ) {
        data1[0] = 85; // High cost of living
      } else if (city1.toLowerCase().includes("chicago")) {
        data1[0] = 65;
      } else {
        data1[0] = Math.floor(Math.random() * 40) + 40; // Random between 40-80
      }

      if (
        city2.toLowerCase().includes("new york") ||
        city2.toLowerCase().includes("san francisco")
      ) {
        data2[0] = 85;
      } else if (city2.toLowerCase().includes("chicago")) {
        data2[0] = 65;
      } else {
        data2[0] = Math.floor(Math.random() * 40) + 40;
      }

      // Housing
      if (
        city1.toLowerCase().includes("new york") ||
        city1.toLowerCase().includes("san francisco")
      ) {
        data1[1] = 90; // Extremely expensive housing
      } else if (city1.toLowerCase().includes("chicago")) {
        data1[1] = 70;
      } else {
        data1[1] = Math.floor(Math.random() * 40) + 40;
      }

      if (
        city2.toLowerCase().includes("new york") ||
        city2.toLowerCase().includes("san francisco")
      ) {
        data2[1] = 90;
      } else if (city2.toLowerCase().includes("chicago")) {
        data2[1] = 70;
      } else {
        data2[1] = Math.floor(Math.random() * 40) + 40;
      }

      // Fill in remaining categories with random but realistic data
      for (let i = 2; i < 6; i++) {
        data1[i] = Math.floor(Math.random() * 40) + 30;
        data2[i] = Math.floor(Math.random() * 40) + 30;
      }

      // Special case for pollution (lower is better)
      if (
        city1.toLowerCase().includes("portland") ||
        city1.toLowerCase().includes("vienna")
      ) {
        data1[4] = 30; // Low pollution
      } else if (
        city1.toLowerCase().includes("beijing") ||
        city1.toLowerCase().includes("delhi")
      ) {
        data1[4] = 85; // High pollution
      }

      if (
        city2.toLowerCase().includes("portland") ||
        city2.toLowerCase().includes("vienna")
      ) {
        data2[4] = 30;
      } else if (
        city2.toLowerCase().includes("beijing") ||
        city2.toLowerCase().includes("delhi")
      ) {
        data2[4] = 85;
      }

      // Apply color coding - for metrics where lower is better (pollution)
      const datasets = barComparisonChart.data.datasets;

      // Update the data
      barComparisonChart.data.datasets[0].data = data1;
      barComparisonChart.data.datasets[1].data = data2;

      // Customizing pollution colors (lower is better)
      // We'll create custom backgrounds array
      const bgColors1 = [];
      const bgColors2 = [];

      for (let i = 0; i < data1.length; i++) {
        if (i === 4) {
          // Pollution index
          if (data1[i] < data2[i]) {
            bgColors1.push("rgba(34, 197, 94, 0.7)"); // Green (better)
            bgColors2.push("rgba(239, 68, 68, 0.7)"); // Red (worse)
          } else if (data1[i] > data2[i]) {
            bgColors1.push("rgba(239, 68, 68, 0.7)");
            bgColors2.push("rgba(34, 197, 94, 0.7)");
          } else {
            bgColors1.push("rgba(59, 130, 246, 0.7)");
            bgColors2.push("rgba(249, 115, 22, 0.7)");
          }
        } else {
          // All other metrics (higher is better)
          if (data1[i] > data2[i]) {
            bgColors1.push("rgba(34, 197, 94, 0.7)");
            bgColors2.push("rgba(239, 68, 68, 0.7)");
          } else if (data1[i] < data2[i]) {
            bgColors1.push("rgba(239, 68, 68, 0.7)");
            bgColors2.push("rgba(34, 197, 94, 0.7)");
          } else {
            bgColors1.push("rgba(59, 130, 246, 0.7)");
            bgColors2.push("rgba(249, 115, 22, 0.7)");
          }
        }
      }

      barComparisonChart.data.datasets[0].backgroundColor = bgColors1;
      barComparisonChart.data.datasets[1].backgroundColor = bgColors2;

      barComparisonChart.update();
    }
  }

  // Update cost trend chart
  function updateCostTrendChart(city1, city2) {
    if (costTrendChart) {
      costTrendChart.data.datasets[0].label = city1;
      costTrendChart.data.datasets[1].label = city2;

      let baseAmount1, baseAmount2;
      let growth1, growth2;

      // Set base amounts based on cities
      if (city1.toLowerCase().includes("new york")) {
        baseAmount1 = 3500;
        growth1 = 50;
      } else if (city1.toLowerCase().includes("san francisco")) {
        baseAmount1 = 3800;
        growth1 = 60;
      } else if (city1.toLowerCase().includes("chicago")) {
        baseAmount1 = 2200;
        growth1 = 30;
      } else {
        baseAmount1 = Math.floor(Math.random() * 2000) + 1000;
        growth1 = Math.floor(Math.random() * 30) + 20;
      }

      if (city2.toLowerCase().includes("new york")) {
        baseAmount2 = 3500;
        growth2 = 50;
      } else if (city2.toLowerCase().includes("san francisco")) {
        baseAmount2 = 3800;
        growth2 = 60;
      } else if (city2.toLowerCase().includes("chicago")) {
        baseAmount2 = 2200;
        growth2 = 30;
      } else {
        baseAmount2 = Math.floor(Math.random() * 2000) + 1000;
        growth2 = Math.floor(Math.random() * 30) + 20;
      }

      // Generate 6 months of data with slight variations
      const data1 = [];
      const data2 = [];

      for (let i = 0; i < 6; i++) {
        // Add some randomness to each month's growth
        const randomFactor1 = Math.random() * 0.4 + 0.8; // 0.8 to 1.2
        const randomFactor2 = Math.random() * 0.4 + 0.8;

        data1.push(Math.round(baseAmount1 + growth1 * i * randomFactor1));
        data2.push(Math.round(baseAmount2 + growth2 * i * randomFactor2));
      }

      costTrendChart.data.datasets[0].data = data1;
      costTrendChart.data.datasets[1].data = data2;
      costTrendChart.update();
    }
  }

  // Update the comparison data based on cities
  function updateComparisonData(city1, city2) {
    // In a real app, this data would come from an API
    // For demo, we'll just update some elements with simulated data

    // Cost of Living
    const city1ColBar = document.querySelector("#col-city1 .bar");
    const city2ColBar = document.querySelector("#col-city2 .bar");
    const city1ColValue = document.querySelector("#col-city1 span");
    const city2ColValue = document.querySelector("#col-city2 span");

    // Generate city-specific data or random if no special case
    let col1, col2;

    if (city1.toLowerCase().includes("new york")) {
      col1 = { percent: 90, value: "$3,500/month" };
    } else if (city1.toLowerCase().includes("san francisco")) {
      col1 = { percent: 95, value: "$3,800/month" };
    } else if (city1.toLowerCase().includes("chicago")) {
      col1 = { percent: 70, value: "$2,200/month" };
    } else {
      const randomCost = Math.floor(Math.random() * 2000) + 1000;
      col1 = {
        percent: Math.floor((randomCost / 4000) * 100),
        value: `$${randomCost}/month`,
      };
    }

    if (city2.toLowerCase().includes("new york")) {
      col2 = { percent: 90, value: "$3,500/month" };
    } else if (city2.toLowerCase().includes("san francisco")) {
      col2 = { percent: 95, value: "$3,800/month" };
    } else if (city2.toLowerCase().includes("chicago")) {
      col2 = { percent: 70, value: "$2,200/month" };
    } else {
      const randomCost = Math.floor(Math.random() * 2000) + 1000;
      col2 = {
        percent: Math.floor((randomCost / 4000) * 100),
        value: `$${randomCost}/month`,
      };
    }

    // Update DOM elements
    if (city1ColBar) city1ColBar.style.width = `${col1.percent}%`;
    if (city2ColBar) city2ColBar.style.width = `${col2.percent}%`;
    if (city1ColValue) city1ColValue.textContent = col1.value;
    if (city2ColValue) city2ColValue.textContent = col2.value;

    // Apply color coding - higher cost of living is worse (red)
    if (col1.percent > col2.percent) {
      city1ColBar.style.backgroundColor = "var(--danger-color)";
      city2ColBar.style.backgroundColor = "var(--success-color)";
    } else if (col2.percent > col1.percent) {
      city1ColBar.style.backgroundColor = "var(--success-color)";
      city2ColBar.style.backgroundColor = "var(--danger-color)";
    } else {
      city1ColBar.style.backgroundColor = "var(--primary-color)";
      city2ColBar.style.backgroundColor = "var(--primary-color)";
    }

    // Similar updates could be done for other comparison categories
    // For brevity, we'll leave those with the default data
  }

  // Add animation when sections come into view
  const sections = document.querySelectorAll("section");

  // Only run the animation if IntersectionObserver is supported
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    sections.forEach((section) => {
      section.classList.add("fade-in");
    });
  }
});
