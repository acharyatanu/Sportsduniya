document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    const rowCount = 20; // Number of rows to load at a time
    const collegeData = [
        {"name": "Malviya National Institute of Technology", "rating": 4.8, "fees": "50000", "userRating": 4.7, "featured": true, "placement": {"highest": "20 LPA", "average": "10 LPA"}},
        {"name": "Jaipur Engineering College and Research Centre", "rating": 4.6, "fees": "40000", "userRating": 4.6, "featured": true, "placement": {"highest": "18 LPA", "average": "9 LPA"} },
        {"name": "Swami Keshwanand Institue of Technology", "rating": 4.2, "fees": "45000", "userRating": 4.1, "featured": true, "placement": {"highest": "22 LPA", "average": "11 LPA"}},
        {"name": "Poornima College", "rating": 3.8, "fees": "35000", "userRating": 4.2, "featured": false, "placement": {"highest": "16 LPA", "average": "8 LPA"}},
        {"name": "Arya College of Engineering", "rating": 3.6, "fees": "60000", "userRating": 3.5, "featured": false, "placement": {"highest": "25 LPA", "average": "12 LPA"}},
        {"name": "Amity University", "rating": 4.1, "fees": "42000", "userRating": 4.4, "featured": false, "placement": {"highest": "19 LPA", "average": "9.5 LPA"}},
        {"name": "Manipal University", "rating": 3.9, "fees": "39000", "userRating": 4.1, "featured": false, "placement": {"highest": "17 LPA", "average": "8.5 LPA"}},
        {"name": "LNMIIT", "rating": 4.3, "fees": "48000", "userRating": 4.6, "featured": true, "placement": {"highest": "23 LPA", "average": "11.5 LPA"}},
        {"name": "Mody University", "rating": 4.0, "fees": "55000", "userRating": 4.1, "featured": false, "placement": {"highest": "24 LPA", "average": "12 LPA"}},
        {"name": "Jaipur Engineering College", "rating": 3.7, "fees": "37000", "userRating": 4.0, "featured": false, "placement": {"highest": "15 LPA", "average": "7.5 LPA"}},
        {"name": "College A", "rating": 4.5, "fees": "50000", "userRating": 4.7, "featured": true, "placement": {"highest": "12 LPA", "average": "6.5 LPA"}},
        {"name": "College B", "rating": 4.0, "fees": "40000", "userRating": 4.5, "featured": false, "placement": {"highest": "5 LPA", "average": "3.5 LPA"}},
        {"name": "College C", "rating": 4.2, "fees": "45000", "userRating": 4.6, "featured": true, "placement": {"highest": "9 LPA", "average": "6.5 LPA"}},
        {"name": "College D", "rating": 3.8, "fees": "35000", "userRating": 4.2, "featured": false, "placement": {"highest": "13 LPA", "average": "7.0 LPA"}},
        {"name": "College E", "rating": 4.7, "fees": "60000", "userRating": 4.8, "featured": true, "placement": {"highest": "11 LPA", "average": "8.0 LPA"}},
        {"name": "College F", "rating": 4.1, "fees": "42000", "userRating": 4.4, "featured": false, "placement": {"highest": "8 LPA", "average": "4.5 LPA"}},
        {"name": "College G", "rating": 3.9, "fees": "39000", "userRating": 4.1, "featured": false, "placement": {"highest": "10 LPA", "average": "5.5 LPA"}},
        {"name": "College H", "rating": 4.3, "fees": "48000", "userRating": 4.6, "featured": true, "placement": {"highest": "15 LPA", "average": "7.5 LPA"}},
        {"name": "College I", "rating": 4.6, "fees": "55000", "userRating": 4.7, "featured": true, "placement": {"highest": "17 LPA", "average": "9.0 LPA"}},
        {"name": "College J", "rating": 3.7, "fees": "37000", "userRating": 4.0, "featured": false, "placement": {"highest": "5 LPA", "average": "3.5 LPA"}}
    ];

    function loadMoreRows() {
        let tableBody = document.getElementById('tableBody');

        for (let i = currentIndex; i < currentIndex + rowCount && i < collegeData.length; i++) {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${i + 1}
                <td>${collegeData[i].name} ${collegeData[i].featured ? '<span class="featured">Featured</span>' : ''}</td>
                <td>${collegeData[i].rating}</td>
                <td>${collegeData[i].fees}</td>
                <td>${collegeData[i].userRating}</td>
                <td>Highest: ${collegeData[i].placement.highest}, Average: ${collegeData[i].placement.average}</td>
                <td>
                    <button onclick="applyToCollege('${collegeData[i].name}')">Apply</button>
                    <button onclick="downloadBrochure('${collegeData[i].name}')">Download Brochure</button>
                </td>
            `;
            tableBody.appendChild(row);
        }
        currentIndex += rowCount;
    }

    function handleScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const bodyHeight = document.body.scrollHeight - windowHeight;

        if (scrollTop >= bodyHeight) {
            loadMoreRows();
        }
    }

    window.addEventListener('scroll', handleScroll);

    loadMoreRows(); 

    
    document.getElementById('search').addEventListener('keyup', function() {
        let filter = this.value.toLowerCase();
        let rows = document.getElementById('tableBody').getElementsByTagName('tr');
        
        for (let i = 0; i < rows.length; i++) {
            let cell = rows[i].getElementsByTagName('td')[1]; // Adjusted for serial number column
            if (cell) {
                let txtValue = cell.textContent || cell.innerText;
                rows[i].style.display = txtValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
            }
        }
    });

    
    window.applyToCollege = function(collegeName) {
        alert(`Applying to ${collegeName}`);
        
    };


    window.downloadBrochure = function(collegeName) {
        alert(`Downloading brochure for ${collegeName}`);
    };

    // Sort functionality
    window.sortTable = function(n) {
        let table = document.getElementById("collegeTable");
        let rows = table.rows;
        let switching = true;
        let dir = "asc"; 
        let switchCount = 0;
        
        while (switching) {
            switching = false;
            let shouldSwitch = false;
            
            for (let i = 1; i < rows.length - 1; i++) {
                let x = rows[i].getElementsByTagName("TD")[n];
                let y = rows[i + 1].getElementsByTagName("TD")[n];
                
                if (dir === "asc" && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                } else if (dir === "desc" && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
            
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchCount++;
            } else if (switchCount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    };
});
