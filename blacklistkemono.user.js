// ==UserScript==
// @name         Kemono.Party Blacklist
// @namespace    https://MeusArtis.ca
// @version      1.2.6
// @author       Meus Artis
// @description  Blacklists posts by Creator ID and provides a UI for managing blacklisted terms
// @icon         https://www.google.com/s2/favicons?domain=kemono.su
// @updateURL    https://meusartis.ca/blacklistkemono.meta.js
// @downloadURL  https://meusartis.ca/blacklistkemono.user.js
// @supportURL   https://t.me/kemonoparty
// @include      /^https:\/\/kemono\.(party|su)\/.*$/
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @license      CC BY-NC-SA 4.0
// @run-at       document-end
// ==/UserScript==

const BlacklistStorage = window.localStorage;
const BlacklistButton = document.createElement("BUTTON");
const BlacklistButtonArtist = document.createElement("BUTTON");
const Blacklisted = JSON.parse(localStorage.getItem("blacklist"));
const BlacklistedText = JSON.parse(localStorage.getItem("blacklist_text"));
const BlacklistedTags = JSON.parse(localStorage.getItem("blacklist_tags"));
const ButtonArea = document.querySelector('.post__actions');
const ButtonAreaArtist = document.querySelector('.user-header__actions');
const HeadMeta = document.querySelector("meta[name='user']");
const HeadMetaArtist = document.querySelector("meta[name='artist_name']");
const styleSheet = document.createElement("style");
const styles = `.creator__blacklist{color:#ddd;font-weight:700;text-shadow:#000 0 0 3px,#000 -1px -1px 0px,#000 1px 1px 0;background-color:transparent;border:transparent}.user-header__blacklist{box-sizing:border-box;font-weight:700;color:#fff;text-shadow:#000 0 0 3px,#000 -1px -1px 0px,#000 1px 1px 0;background-color:transparent;border:transparent;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}`;
if ("blacklist" in BlacklistStorage) {
    console.log("Blacklist Exists");
} else {
    alert("Blacklist does not exist, creating a new one");
    BlacklistStorage.setItem("blacklist", "[]");
}

if ("blacklist_text" in BlacklistStorage) {
    console.log("Blacklist Text Exists");
} else {
    alert("Blacklist text does not exist, creating a new one");
    BlacklistStorage.setItem("blacklist_text", "[]");
}

if ("blacklist_tags" in BlacklistStorage) {
    console.log("Blacklist Tags Exists");
} else {
    alert("Blacklist tags does not exist, creating a new one");
    BlacklistStorage.setItem("blacklist_tags", "[]");
}

var HeadMetaID = document.querySelector("meta[name='id']");
if (HeadMeta) {
    console.log("Blacklist Enabled (Post Page)");
    var HeadMetaID = HeadMeta.getAttribute("content");
    ButtonArea.appendChild(BlacklistButton);
} else if (HeadMetaArtist) {
    console.log("Blacklist Enabled (Artist Page)");
    var HeadMetaID = HeadMetaID.getAttribute("content");
    ButtonAreaArtist.appendChild(BlacklistButton);
} else {
    console.log("Blacklist Enabled (Recent Posts/Search Page)");
}
const UnBlacklist = Blacklisted.indexOf(HeadMetaID);
document.head.appendChild(styleSheet);
styleSheet.innerText = styles;
styleSheet.type = "text/css";
BlacklistButton.classList.add("creator__blacklist");
BlacklistButton.type = "button";
if (Blacklisted.indexOf(HeadMetaID) !== -1) {
    BlacklistButton.innerHTML = '<span class="creator__blacklist-icon">⛒</span><span>Blacklisted</span>';
    BlacklistButton.onclick = function () {
        Blacklisted.splice(UnBlacklist, 1);
        BlacklistStorage.setItem("blacklist", JSON.stringify(Blacklisted));
        alert("Creator Unblacklisted");
        location.reload();
    };
} else {
    BlacklistButton.innerHTML = '<span class="creator__blacklist-icon">⛔</span><span>Blacklist</span>';
    BlacklistButton.onclick = function () {
        Blacklisted.push(HeadMetaID);
        BlacklistStorage.setItem("blacklist", JSON.stringify(Blacklisted));
        alert("Creator Blacklisted");
        location.reload();
    };
}
Blacklisted.forEach(function (item) {
    $("article[data-user='" + item + "']").remove();
});

function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
    var startTimeInMs = Date.now();
    (function loopSearch() {
        if (document.querySelector(selector) != null) {
            callback();
            return;
        }
        else {
            setTimeout(function () {
                if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
                    return;
                loopSearch();
            }, checkFrequencyInMs);
        }
    })();
};

waitForElementToDisplay("#paginator-top > menu", function () {
    window.addEventListener('hashchange', function () {
        Blacklisted.forEach(function (item) {
            console.log("Item: " + item);
            $("a[href='/patreon/user/" + item + "']").remove(); //for recently updated
            $("a[href='/fanbox/user/" + item + "']").remove(); //this only works for the 100ms after a page load before it reloads itself (why?)
            $("a[href='/gumroad/user/" + item + "']").remove(); //i dont get paid for this, im not a developer, i dont know javascript, regex doesnt work, stop reading my comments, fuck you.
            $("a[href='/subscribestar/user/" + item + "']").remove();
            $("a[href='/dlsite/user/" + item + "']").remove();
            $("a[href='/discord/server/" + item + "']").remove();
            $("a[href='/fantia/user/" + item + "']").remove();
            $("a[href='/boosty/user/" + item + "']").remove();
            $("a[href='/afdian/user/" + item + "']").remove();
        });
    });
    Blacklisted.forEach(function (item) {
        console.log("Item: " + item);
        $("a[href='/patreon/user/" + item + "']").remove(); //for recently updated
        $("a[href='/fanbox/user/" + item + "']").remove(); //this only works for the 100ms after a page load before it reloads itself (why?)
        $("a[href='/gumroad/user/" + item + "']").remove(); //i dont get paid for this, im not a developer, i dont know javascript, regex doesnt work, stop reading my comments, fuck you.
        $("a[href='/subscribestar/user/" + item + "']").remove();
        $("a[href='/dlsite/user/" + item + "']").remove();
        $("a[href='/discord/server/" + item + "']").remove();
        $("a[href='/fantia/user/" + item + "']").remove();
        $("a[href='/boosty/user/" + item + "']").remove();
        $("a[href='/afdian/user/" + item + "']").remove();
        $("a[href='/afdian/user/" + item + "']").remove();
    });

    BlacklistedText.forEach(function (item) {
        console.log("Blacklisted item: " + item);

        $("header.post-card__header").each(function () {
            let headerText = $(this).text();
            if (headerText.includes(item)) {
                $(this).closest("article").remove(); // Remove the closest <a> parent element
            }
        });

    });

    // Function to fetch data with retry mechanism
    async function fetchDataWithRetry(url, retries = 5, delay = 2000) {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(url);
                if (response.status === 429) {
                    console.log(`Received 429. Waiting for ${delay}ms before retrying...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                } else {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return await response.json();
                }
            } catch (error) {
                console.error(`Attempt ${i + 1} failed: ${error.message}`);
                if (i === retries - 1) {
                    throw new Error('Max retries reached');
                }
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    const currentPageUrl = window.location.href;

    const apiURL = currentPageUrl.replace(".su/", ".su/api/v1/")

    console.log(apiURL)

    // Example usage
    fetchDataWithRetry(apiURL)
        .then(data => {
            console.log('Data fetched successfully:', data);

            if (BlacklistedTags && BlacklistedTags.length > 0) {
                data.forEach(post => {
                    console.log(`Processing post ID: ${post.id}`);

                    if (post.tags) {
                        // Parsing the tags field
                        try {
                            // Remove the curly braces and double quotes
                            const tagsString = post.tags.replace(/[\{\}"]/g, '');

                            // Split the string into an array of tags
                            const tagsArray = tagsString.split(',');

                            console.log(`Tags for post ID ${post.id}:`, tagsArray);

                            // Loop through each tag
                            tagsArray.forEach(tag => {
                                console.log(`Tag: ${tag.trim()}`);

                                BlacklistedTags.forEach(function (item) {
                                    console.log("Blacklisted tags: " + item);

                                    // Select the article with the matching data-id attribute
                                    const postElement = $(`article[data-id="${post.id}"]`);

                                    if (postElement.length > 0) {
                                        console.log(`Post ID ${post.id} found in DOM.`);

                                        // Check if any of the tags match the blacklisted items
                                        if (tagsArray.some(t => t.trim() === item)) {
                                            postElement.remove(); // Remove the entire <article> element
                                            console.log(`Removed post ID ${post.id} from DOM.`);
                                        }
                                    }
                                });

                            });
                        } catch (e) {
                            console.error(`Error parsing tags for post ID ${post.id}:`, e);
                        }
                    }
                });
            }
        })
        .catch(error => {
            console.error('Failed to fetch data:', error);
        });

}, 100, 30000); //page takes longer than 30 seconds to load? (as it sometimes does), rip you then

(function () {
    const BlacklistStorage = window.localStorage;

    // Initialize blacklists if they do not exist
    if (!BlacklistStorage.getItem("blacklist")) {
        BlacklistStorage.setItem("blacklist", JSON.stringify([]));
    }
    if (!BlacklistStorage.getItem("blacklist_text")) {
        BlacklistStorage.setItem("blacklist_text", JSON.stringify([]));
    }

    const Blacklisted = JSON.parse(BlacklistStorage.getItem("blacklist"));
    const BlacklistedText = JSON.parse(BlacklistStorage.getItem("blacklist_text"));
    const ButtonArea = document.querySelector('.post__actions');
    const ButtonAreaArtist = document.querySelector('.user-header__actions');
    const HeadMeta = document.querySelector("meta[name='user']");
    const HeadMetaArtist = document.querySelector("meta[name='artist_name']");

    const styles = `
    #blacklist-popup {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--popup-background, #fff);
        padding: 20px;
        border: 1px solid var(--popup-border, #ddd);
        border-radius: 8px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        width: 600px; /* Fixed width */
        height: 400px; /* Fixed height */
        overflow: hidden; /* Hide overflow initially */
    }

    #blacklist-popup h2 {
        margin-top: 0;
        color: var(--popup-heading-text, #333);
        font-size: 1.5em;
        font-weight: 600;
        text-align: center;
    }

    #blacklist-popup .tabs {
        display: flex;
        border-bottom: 1px solid var(--popup-border, #ddd);
        background-color: var(--tab-background, #f1f1f1);
    }

    #blacklist-popup .tab {
        flex: 1;
        display: flex;
        align-items: center; /* Center content vertically */
        justify-content: center; /* Center content horizontally */
        padding: 12px;
        cursor: pointer;
        text-align: center;
        border: 1px solid var(--tab-border, #ddd);
        border-bottom: none;
        color: var(--tab-text, #333);
        font-size: 1em;
        transition: background-color 0.3s, color 0.3s;
    }

    #blacklist-popup .tab.active {
        background-color: var(--tab-active-background, #007bff);
        border-bottom: 1px solid var(--tab-border, #007bff);
        font-weight: 600;
        color: #fff;
    }

    #blacklist-popup .tab-content {
        display: none;
        height: calc(100% - 50px); /* Adjust based on tab height */
        overflow-y: auto; /* Enable vertical scrolling if content exceeds height */
        padding: 20px;
    }

    #blacklist-popup .tab-content.active {
        display: block;
    }

    #blacklist-popup input[type="text"] {
        width: calc(100% - 20px); /* Full width minus padding */
        padding: 10px;
        border: 1px solid var(--input-border, #ddd);
        border-radius: 8px;
        box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
        font-size: 1em;
        color: var(--input-text, #fff); /* Text color */
        background-color: var(--input-background, #333); /* Background color for dark mode */
        transition: border-color 0.3s, box-shadow 0.3s;
        margin-bottom: 10px; /* Space between input and button */
    }

    #blacklist-popup input[type="text"]:focus {
        border-color: var(--input-focus-border, #007bff);
        box-shadow: 0px 0px 4px rgba(0, 123, 255, 0.3);
        outline: none;
    }

    #blacklist-popup button {
        background-color: var(--button-background, #007bff);
        color: #fff;
        padding: 10px 15px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1em;
        font-weight: 600;
        transition: background-color 0.3s, box-shadow 0.3s;
    }

    #blacklist-popup button:hover {
        background-color: var(--button-hover-background, #0056b3);
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    }

    #blacklist-popup button:active {
        background-color: var(--button-active-background, #004494);
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
    }

    #blacklist-popup ul {
        list-style: none;
        padding: 0;
        margin: 10px 0 0;
    }

    #blacklist-popup ul li {
        padding: 8px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #blacklist-popup ul li button {
        background-color: var(--remove-button-background, #dc3545);
        color: #fff;
        padding: 6px 12px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.9em;
        font-weight: 600;
        transition: background-color 0.3s, box-shadow 0.3s;
    }

    #blacklist-popup ul li button:hover {
        background-color: var(--remove-button-hover-background, #c82333);
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    }

    #blacklist-popup ul li button:active {
        background-color: var(--remove-button-active-background, #bd2130);
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
    }

    #blacklist-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
    }

    #blacklist-add, #blacklist-text-add, #blacklist-tags-add {
        display: block; /* Make the button a block-level element */
        width: 100%;     /* Set the width to 100% of its parent container */
        padding: 10px;   /* Add padding for better appearance */
        font-size: 16px; /* Adjust the font size if needed */
        background-color: #007BFF; /* Background color of the button */
        color: white;    /* Text color */
        border: none;    /* Remove default border */
        border-radius: 4px; /* Rounded corners */
        cursor: pointer; /* Change cursor to pointer on hover */
        text-align: center; /* Center-align text inside the button */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional shadow */
    }

    #backup-blacklist-json {
        display: block; /* Make the button a block-level element */
        width: 100%;     /* Set the width to 100% of its parent container */
        padding: 10px;   /* Add padding for better appearance */
        font-size: 16px; /* Adjust the font size if needed */
        background-color: #007BFF; /* Background color of the button */
        color: white;    /* Text color */
        border: none;    /* Remove default border */
        border-radius: 4px; /* Rounded corners */
        cursor: pointer; /* Change cursor to pointer on hover */
        text-align: center; /* Center-align text inside the button */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional shadow */
    }

    @media (prefers-color-scheme: dark) {
        #blacklist-popup {
            background-color: #333;
            color: #f0f0f0;
            border: 1px solid #444;
        }
        #blacklist-popup h2 {
            color: #f0f0f0;
        }
        #blacklist-popup .tabs {
            background-color: #444;
        }
        #blacklist-popup .tab {
            background-color: #333;
            color: #f0f0f0;
        }
        #blacklist-popup .tab.active {
            background-color: #222;
            color: #f0f0f0;
        }
        #blacklist-popup input {
            border: 1px solid #555;
            background-color: #222;
            color: #f0f0f0;
        }
        #blacklist-popup button {
            background-color: #007bff;
        }
        #blacklist-popup ul li button {
            background-color: #dc3545;
            
        }
    }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    function addBlacklistButton() {
        const button = document.createElement('button');
        button.id = 'blacklist-button';
        button.textContent = 'Manage Blacklist';

        waitForElementToDisplay(".global-sidebar-entry-item[href='/account/logout']", function () {
            document.querySelector(".global-sidebar-entry-item[href='/account/logout']").after(button);
        }, 100, 30000);

        const popup = document.createElement('div');
        popup.id = 'blacklist-popup';
        popup.innerHTML = `
            <h2>Manage Blacklist</h2>
            <div class="tabs">
                <div class="tab active" data-tab="blacklist-content">Blacklist</div>
                <div class="tab" data-tab="blacklist-text-content">Blacklist Text</div>
                <div class="tab" data-tab="blacklist-tags-content">Blacklist Tags</div>
                <div class="tab" data-tab="backup-content">Misc</div>
            </div>
            <div class="tab-content active" id="blacklist-content">
                <input type="text" id="blacklist-input" placeholder="Enter text to blacklist...">
                <button id="blacklist-add">Add</button>
                <ul id="blacklist-list"></ul>
            </div>
            <div class="tab-content" id="blacklist-text-content">
                <input type="text" id="blacklist-text-input" placeholder="Enter text to blacklist...">
                <button id="blacklist-text-add">Add</button>
                <ul id="blacklist-text-list"></ul>
            </div>
            <div class="tab-content" id="blacklist-tags-content">
                <input type="text" id="blacklist-tags-input" placeholder="Enter tags to blacklist...">
                <button id="blacklist-tags-add">Add</button>
                <ul id="blacklist-tags-list"></ul>
            </div>
            <div class="tab-content" id="backup-content">
                <table>
                    <tr>
                        <th><button id="backup-blacklist-json">Backup</button></th>
                        <th><input type="file" id="restore-blacklist-file" accept=".json"></th>
                        <th><button id="restore-blacklist-json">Restore</button></th>
                    </tr>

                    <tr>
                        <th><button id="backup-blacklist-text-json">Backup Text</button></th>
                        <th><input type="file" id="restore-blacklist-text-file" accept=".json"></th>
                        <th><button id="restore-blacklist-text-json">Restore</button></th>
                    </tr>

                    <tr>
                        <th><button id="backup-blacklist-tags-json">Backup Tags</button></th>
                        <th><input type="file" id="restore-blacklist-tags-file" accept=".json"></th>
                        <th><button id="restore-blacklist-tags-json">Restore</button></th>
                    </tr>
                </table>
            </div>
        `;

        document.body.appendChild(popup);

        const overlay = document.createElement('div');
        overlay.id = 'blacklist-overlay';
        document.body.appendChild(overlay);

        button.addEventListener('click', () => {
            overlay.style.display = 'block';
            popup.style.display = 'block';
            loadBlacklist();
            loadBlacklistText();
            loadBlacklistTags();
        });

        overlay.addEventListener('click', () => {
            overlay.style.display = 'none';
            popup.style.display = 'none';
            location.reload();  // Reload the page when closing the popup
        });

        document.getElementById('blacklist-add').addEventListener('click', () => {
            const input = document.getElementById('blacklist-input');
            const value = input.value.trim();
            if (value) {
                Blacklisted.push(value);
                BlacklistStorage.setItem('blacklist', JSON.stringify(Blacklisted));
                input.value = '';
                loadBlacklist();
            }
        });

        document.getElementById('blacklist-text-add').addEventListener('click', () => {
            const input = document.getElementById('blacklist-text-input');
            const value = input.value.trim();
            if (value) {
                BlacklistedText.push(value);
                BlacklistStorage.setItem('blacklist_text', JSON.stringify(BlacklistedText));
                input.value = '';
                loadBlacklistText();
            }
        });

        document.getElementById('blacklist-tags-add').addEventListener('click', () => {
            const input = document.getElementById('blacklist-tags-input');
            const value = input.value.trim();
            if (value) {
                BlacklistedTags.push(value);
                BlacklistStorage.setItem('blacklist_tags', JSON.stringify(BlacklistedTags));
                input.value = '';
                loadBlacklistTags();
            }
        });

        function loadBlacklist() {
            const list = document.getElementById('blacklist-list');
            list.innerHTML = '';
            Blacklisted.forEach((item, index) => {
                const li = document.createElement('li');
                li.textContent = item;
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.addEventListener('click', () => {
                    Blacklisted.splice(index, 1);
                    BlacklistStorage.setItem('blacklist', JSON.stringify(Blacklisted));
                    loadBlacklist();
                });
                li.appendChild(removeButton);
                list.appendChild(li);
            });
        }

        function loadBlacklistText() {
            const list = document.getElementById('blacklist-text-list');
            list.innerHTML = '';
            BlacklistedText.forEach((item, index) => {
                const li = document.createElement('li');
                li.textContent = item;
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.addEventListener('click', () => {
                    BlacklistedText.splice(index, 1);
                    BlacklistStorage.setItem('blacklist_text', JSON.stringify(BlacklistedText));
                    loadBlacklistText();
                });
                li.appendChild(removeButton);
                list.appendChild(li);
            });
        }

        function loadBlacklistTags() {
            const list = document.getElementById('blacklist-tags-list');
            list.innerHTML = '';
            BlacklistedTags.forEach((item, index) => {
                const li = document.createElement('li');
                li.textContent = item;
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.addEventListener('click', () => {
                    BlacklistedTags.splice(index, 1);
                    BlacklistStorage.setItem('blacklist_tags', JSON.stringify(BlacklistedTags));
                    loadBlacklistTags();
                });
                li.appendChild(removeButton);
                list.appendChild(li);
            });
        }

        function handleTabSwitch() {
            const tabs = document.querySelectorAll('#blacklist-popup .tab');
            const contents = document.querySelectorAll('#blacklist-popup .tab-content');

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const targetTab = tab.getAttribute('data-tab');

                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');

                    contents.forEach(content => {
                        if (content.id === `${targetTab}`) {
                            content.classList.add('active');
                        } else {
                            content.classList.remove('active');
                        }
                    });
                });
            });
        }

        handleTabSwitch();
    }

    function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
        const startTimeInMs = Date.now();
        (function loopSearch() {
            if (document.querySelector(selector) != null) {
                callback();
                return;
            } else {
                setTimeout(function () {
                    if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs) return;
                    loopSearch();
                }, checkFrequencyInMs);
            }
        })();
    }

    addBlacklistButton();

    // Function to back up blacklist data as a JSON file
    function backupBlacklist(storageKey) {
        const blacklist = JSON.parse(localStorage.getItem(storageKey)) || {};
        const blob = new Blob([JSON.stringify(blacklist, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${storageKey}_backup.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Function to restore blacklist data from a JSON file
    function restoreBlacklist(event, storageKey) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const json = JSON.parse(e.target.result);
                localStorage.setItem(storageKey, JSON.stringify(json));
                alert(`${storageKey} restored successfully.`);
            } catch (error) {
                alert("Error parsing JSON file.");
            }
        };
        reader.readAsText(file);
    }

    // Event listeners for backup and restore buttons
    document.getElementById("backup-blacklist-json").addEventListener("click", () => backupBlacklist("blacklist"));
    document.getElementById("restore-blacklist-file").addEventListener("change", () => restoreBlacklist("blacklist"));

    document.getElementById("backup-blacklist-text-json").addEventListener("click", () => backupBlacklist("blacklist_text"));
    document.getElementById("restore-blacklist-text-file").addEventListener("change", () => restoreBlacklist("blacklist_text"));

    document.getElementById("backup-blacklist-tags-json").addEventListener("click", () => backupBlacklist("blacklist_tags"));
    document.getElementById("restore-blacklist-tags-file").addEventListener("change", () => restoreBlacklist("blacklist_tags"));

})();
