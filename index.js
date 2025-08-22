import { extensionArray } from "./data.js";

const test = document.querySelector(".test");
let currentFilter = 'All';
let lightTheme = false;
document.addEventListener('DOMContentLoaded', () => {
    renderGrid();
    activationSwitch();
    toggleTheme();
});

function testFun() {
    test.innerHTML = extensionArray.length;
}

function arrayTest(arr) {
    arr[0].isActive = false;
    test.innerHTML = arr[0].isActive;
}

//arrayTest(extensionArray);

function fadeIn() {
    const body = document.querySelector(".brows-ext__body");
    body.classList.add("brows-ext__fade-in");
    setTimeout(() => {
        body.classList.remove("brows-ext__fade-in");
    }, 1000);
}

fadeIn();


function addExtensions(arr, act = 'all') {
    const gridCont = document.querySelector(".brows-ext__body");
    gridCont.innerHTML = '';

    switch (act) {
        case 'active':
            arr = arr.filter(ext => ext.isActive);
            break;
        
        case 'inactive':
            arr = arr.filter(ext => !ext.isActive);
            break;

        case 'all':
            default:
            break;
    }
    
    arr.forEach((ext, i) => {
        const origInd = extensionArray.indexOf(ext);
        const extBox = document.createElement('div');
        extBox.classList.add("brows-ext__extension-box");
        gridCont.appendChild(extBox);

        const boxTop = document.createElement('div');
        boxTop.classList.add("brows-ext__box-top");
        extBox.appendChild(boxTop);

        const boxImg = document.createElement('img');
        boxImg.classList.add("brows-ext__box-img");
        boxImg.src = ext.logo;
        boxImg.alt = ext.name;
        boxTop.appendChild(boxImg);

        const headWrap = document.createElement('div');
        headWrap.classList.add("brows-ext__box-heading-wrap");
        boxTop.appendChild(headWrap);

        const boxHeading = document.createElement('h2');
        boxHeading.classList.add("brows-ext__box-heading");
        boxHeading.textContent = ext.name;
        headWrap.appendChild(boxHeading);

        const boxDesc = document.createElement('p');
        boxDesc.classList.add("brows-ext__box-description");
        boxDesc.textContent = ext.description;
        headWrap.appendChild(boxDesc);  
        
        const boxBottom = document.createElement('div');
        boxBottom.classList.add("brows-ext__box-bottom");
        extBox.appendChild(boxBottom);

        const remove = document.createElement('div');
        remove.classList.add("brows-ext__box-remove");
        remove.role = 'button';
        remove.tabIndex = (4 + i * 2 + 1);
        remove.setAttribute('data-id', origInd);
        remove.textContent = 'Remove';
        boxBottom.appendChild(remove);

        const boxSwitch = document.createElement('div');
        boxSwitch.classList.add("brows-ext__switch");
        boxSwitch.setAttribute('data-id', origInd);
        boxSwitch.tabIndex = (4 + i * 2 + 1);
        boxBottom.appendChild(boxSwitch);

        const switchButton = document.createElement('div');
        switchButton.classList.add("brows-ext__switch-button");
        boxSwitch.appendChild(switchButton);
    })
}

addExtensions(extensionArray);

function sortExtensions() {
    const buttons = document.querySelectorAll(".brows-ext__active-button");
    const buttonSwitch = document.querySelectorAll(".brows-ext__switch");


    buttons.forEach((button, index) => {
        const buttonText = button.querySelector(".brows-ext__active-h2");
        function sorting() {
            buttons.forEach(btn => {
                btn.classList.remove("brows-ext__active-button--selected");
                const h2 = btn.querySelector(".brows-ext__active-h2");
                if (h2) h2.classList.remove("brows-ext__active-h2--selected");
            });
            const text = button.textContent.trim();
            currentFilter = text;
            button.classList.add("brows-ext__active-button--selected");
            const selectedH2 = button.querySelector(".brows-ext__active-h2");
            if (selectedH2) selectedH2.classList.add("brows-ext__active-h2--selected");
            renderGrid();
            activationSwitch();
            fadeIn();
        }
        button.addEventListener('click', sorting);
        button.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                sorting();
            };
        });
    });
}

sortExtensions();

function toggleTheme() {
    const themeButton = document.querySelector(".brows-ext__sun-logo-box");
    const main = document.querySelector(".brows-ext__main");
    const buttons = document.querySelectorAll(".brows-ext__switch");

    function toggled() {
        main.classList.toggle("brows-ext__light-theme");
        buttons.forEach(b => b.classList.toggle("brows-ext__switch-light"));
        lightTheme = !lightTheme;
        makeActive();
    }

    function toggleEvent(event) {
        if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) {
            toggled();
        }
    }

    themeButton.addEventListener('click', toggleEvent);
    themeButton.addEventListener('keydown', toggleEvent);
}

function activationSwitch() {
    const buttons = document.querySelectorAll(".brows-ext__switch");
    const buttonInner = document.querySelectorAll(".brows-ext__switch-button");
    const main = document.querySelector(".brows-ext__main");

    function activated(button, i) {
        let dataNum = Number(button.dataset.id);
         buttonInner[i].classList.toggle("brows-ext__toggle-switch");
         if (lightTheme) {
                button.classList.toggle("brows-ext__switch-toggled-light");
                button.classList.remove("brows-ext__switch-toggled")
            } else {
                button.classList.toggle("brows-ext__switch-toggled");
                button.classList.remove("brows-ext__switch-toggled-light");
            }
            if (extensionArray[dataNum].isActive === false) {
                extensionArray[dataNum].isActive = true;
            } else {
                extensionArray[dataNum].isActive = false;
            }
    }


    buttons.forEach((button, i) => {
        button.addEventListener('click', function() {
            activated(button, i);
        });

        button.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                activated(button, i);
            }
        });
    });
    
}

function makeActive() {
    const sw = document.querySelectorAll(".brows-ext__switch");
    const swInner = document.querySelectorAll(".brows-ext__switch-button");

    sw.forEach((s, i) => {
        const ind = s.dataset.id;

        if (extensionArray[ind].isActive) {
            if (s.classList.contains("brows-ext__switch-light")) {
                s.classList.remove("brows-ext__switch-toggled");
                s.classList.add("brows-ext__switch-toggled-light");
            } else {
                s.classList.remove("brows-ext__switch-toggled-light");
                s.classList.add("brows-ext__switch-toggled");
            }
            swInner[i].classList.add("brows-ext__toggle-switch");
        }
    });
    
}

makeActive();

function removeExtension() {
    const removeButton = document.querySelectorAll(".brows-ext__box-remove");
    const box = document.querySelectorAll(".brows-ext__extension-box");
    
    function removed(button) {
            const id = button.dataset.id;
            const itemName = extensionArray[id].name;
            const boxEL = button.closest(".brows-ext__extension-box");
            const heading = boxEL.querySelector("h2");
            const deleteItem = extensionArray.findIndex(i => i.name === heading.textContent);

            if (deleteItem !== -1) {
                boxEL.classList.add("brows-ext__fade-out");
                setTimeout(() => {
                   extensionArray.splice(deleteItem, 1);
                   renderGrid();
                   activationSwitch();
                }, 1500);
            }

            setTimeout(() => {
                fadeIn();
            }, 1450);
    }

    removeButton.forEach(button => {
        button.addEventListener('click', function() {
            removed(button);
        });

        button.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                removed(button);
            }
        })
    });
}

removeExtension();

function applyThemeToButtons() {
    const buttons = document.querySelectorAll(".brows-ext__switch");
    buttons.forEach(b => {
        if (lightTheme) {
            b.classList.add("brows-ext__switch-light");
        } else {
            b.classList.remove("brows-ext__switch-light");
        }
    });
}

function renderGrid() {
    const filter = currentFilter || 'All';
    const main = document.querySelector(".brows-ext__main");
    const buttons = document.querySelectorAll(".brows-ext__switch");

    switch (currentFilter) {
        case 'All':
            addExtensions(extensionArray);
            break;
        case 'Active':
            addExtensions(extensionArray, 'active');
            break;
        case 'Inactive':
            addExtensions(extensionArray, 'inactive');
            break;
    }

            applyThemeToButtons();
            makeActive();
            removeExtension();
}


