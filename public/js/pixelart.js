const app = {
    gridSizeInput: null,
    pixelSizeInput: null,
    paletteContainerElem: null,
    gridSize: 6,
    pixelSize: 50,
    currentColor: "plain",
    styles: ["plain", "empty", "yellow", "pink", "blue"],

    init() {
        // Créer le formulaire
        app.createForm();
        // Créer la grille initial
        app.createGrid();
        // On setup la palette de couleur
        app.createPalette();
    },

    createPalette() {
        const configContainer = document.getElementById("config-container");
        const paletteContainerElem = document.createElement("div");
        paletteContainerElem.className = "palette-container";
        configContainer.appendChild(paletteContainerElem);

        // On créé les elements "palette" en utilisant le tableau styles
        app.styles.forEach((color) => {
            const paletteElem = document.createElement("div");
            paletteElem.classList.add("palette");
            paletteElem.classList.add(color);
            paletteElem.setAttribute("data-color", color);

            if (color === "plain") {
                paletteElem.classList.add("current");
            }
            // J'insere ma div dans le container des couleurs
            paletteContainerElem.appendChild(paletteElem);
        });

        const elemsPalette = document.querySelectorAll(".palette");
        app.paletteContainerElem = elemsPalette;

        app.paletteContainerElem.forEach((elem) => {
            elem.addEventListener("click", app.reagirClickPalette);
        });
    },

    reagirClickPalette(event) {
        app.currentColor = event.target.dataset.color;

        const paletteElems = document.querySelectorAll(".palette");
        paletteElems.forEach((elem) => {
            elem.classList.remove("current");
        });

        event.target.classList.add("current");
    },

    createGrid() {
        const gridContainer = document.getElementById("invader");
        gridContainer.innerHTML = "";
        gridContainer.style.gridTemplateColumns = `repeat(${app.gridSize}, 1fr)`;
        gridContainer.style.height = `${app.gridSize * app.pixelSize}px`;
        gridContainer.style.width = `${app.gridSize * app.pixelSize}px`;

        for (let i = 0; i < app.gridSize * app.gridSize; i++) {
            const pixelElem = document.createElement("div");
            pixelElem.className = "pixel";

            // J'ajoute un ecouteur d'evenement sur le pixel
            pixelElem.addEventListener("click", app.reagirClick);
            gridContainer.appendChild(pixelElem);
        }
    },

    createForm() {
        const form = document.querySelector(".configuration");
        // Je créée mes inputs
        const gridSizeInput = document.createElement("input");
        gridSizeInput.className = "configuration-input";
        gridSizeInput.type = "text";
        gridSizeInput.placeholder = "Pixels par ligne";
        gridSizeInput.name = "gridSize";
        gridSizeInput.id = "gridSizeInput";

        // Je genere un input taille des pixels
        const pixelSizeInput = document.createElement("input");
        pixelSizeInput.className = "configuration-input";
        pixelSizeInput.type = "text";
        pixelSizeInput.placeholder = "Taille d'un pixel";
        pixelSizeInput.name = "pixelSize";
        pixelSizeInput.id = "pixelSizeInput";

        // Je stocke la référence à mon input dans l'objet app
        app.gridSizeInput = gridSizeInput;
        app.pixelSizeInput = pixelSizeInput;

        const button = document.createElement("button");
        button.className = "configuration-button";
        button.type = "submit";
        button.textContent = "Valider";

        form.addEventListener("submit", app.reagirSubmit);

        // J'insère mes inputs dans le 'form'
        form.appendChild(gridSizeInput);
        form.appendChild(pixelSizeInput);
        form.appendChild(button);
    },

    reagirClick(event) {
        // J'ai besoin de savoir quel pixel a été cliqué
        const clickedPixelElem = event.target;
        clickedPixelElem.className = `pixel ${app.currentColor}`;
    },

    reagirSubmit(event) {
        console.log("submit");
        // J'empêche la soumission du formulaire
        event.preventDefault();

        // Je regénère une grille
        app.gridSize = app.gridSizeInput.value;
        app.pixelSize = app.pixelSizeInput.value;
        app.createGrid();
    },
};

app.init();
