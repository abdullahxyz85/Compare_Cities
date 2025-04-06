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

  // Initialize charts
  initProfessionCharts();

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
      updateCharts(city1Value, city2Value);
    }, 1500);
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

  // Update charts with new data (simulated)
  function updateCharts(city1, city2) {
    // In a real app, we would fetch actual data based on the cities
    // For demo purposes, we'll just regenerate random data

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
