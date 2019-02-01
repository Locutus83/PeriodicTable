$(document).ready(function () {
    $('.td-clickable').click(function (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        if ($('#quizMode')[0].checked) {
            popupQuiz(this);
        } else if ($('#studyMode')[0].checked) {
            popupStudyCard(this);
        }
    });
});

function popupQuiz(source) {
    var tdId = source.id;
    var validIdRegex = /\d+-\d+/;
    if (!validIdRegex.test(tdId) || source.innerHTML !== '?') {
        return;
    }

    if (!elements[tdId]) {
        alert("This isn't ready to be tested on yet. We only have the first " + elements.length + ".");
        return;
    }

    // Show the modal and reset the values.
    $('#elementDataDiv').toggle(true);
    $('#position').val(tdId);
    $('#positionHeader')[0].innerText = tdId;
    $('#name').val('');
    $('#atomicNumber').val('');
    $('#symbol').val('');
    $('#name').focus();
}

function popupStudyCard(source) {
    var tdId = source.id;
    var validIdRegex = /\d+-\d+/;
    if (!validIdRegex.test(tdId) || source.innerHTML !== '?') {
        return;
    }

    var elementData = elements[tdId];
    $('#elementStudyDataDiv').toggle(true);
    $('#elementName')[0].innerText = elementData.name;
    $('#atomicNumberForStudy')[0].innerText = 'Atomic Number: ' + elementData.atomicNumber;
    $('#symbolForStudy')[0].innerText = 'Symbol: ' + elementData.symbol;
}

function submitData(elementData) {
    // elementData will have:
    //   - name
    //   - atomicNumber
    //   - symbol
    //   - position

    if (!elements[elementData.position]) {
        alert("Unable to find that element. Please select another element.");
        // Hide the modal.
        closeModal();
        return;
    }

    var testElement = elements[elementData.position];

    if (
        testElement.atomicNumber != elementData.atomicNumber
        ||
        testElement.symbol.toLowerCase() != elementData.symbol.toLowerCase()
        ||
        testElement.name.toLowerCase() != elementData.name.toLowerCase()
    ) {
        testElement.errorCount++;
        alert("This isn't accurate. Please try again.");
        if (testElement.errorCount >= 3) {
            alert("Here is what was expected:" + testElement.toString());
            closeModal();
            testElement.errorCount = 0;
        }
        return;
    }

    alert("Correct!!!");
    $("#" + elementData.position)[0].innerHTML = testElement.buildElementCell();

    // Hide the modal.
    closeModal();
}

function closeModal() {
    $('#elementDataDiv').toggle(false);
    $('#elementStudyDataDiv').toggle(false);
}

function checkKey() {
    if ($('#amText')[0].value.length > 0 && $('#amText')[0].value.toLowerCase() === 'alkali metals') {
        $('#amCell')[0].classList.remove('error-field');
    } else {
        $('#amCell').addClass('error-field');
    }
    // aemText
    if ($('#aemText')[0].value.toLowerCase() === 'alkaline earth metals') {
        $('#aemCell')[0].classList.remove('error-field');
    } else {
        $('#aemCell').addClass('error-field');
    }
    // teText
    if ($('#teText')[0].value.toLowerCase() === 'transition elements') {
        $('#teCell')[0].classList.remove('error-field');
    } else {
        $('#teCell').addClass('error-field');
    }
    // pmText
    if ($('#pmText')[0].value.toLowerCase() === 'poor metals') {
        $('#pmCell')[0].classList.remove('error-field');
    } else {
        $('#pmCell').addClass('error-field');
    }
    // mText
    if ($('#mText')[0].value.toLowerCase() === 'metalloids') {
        $('#mCell')[0].classList.remove('error-field');
    } else {
        $('#mCell').addClass('error-field');
    }
    // nmText
    if ($('#nmText')[0].value.toLowerCase() === 'non-metals') {
        $('#nmCell')[0].classList.remove('error-field');
    } else {
        $('#nmCell').addClass('error-field');
    }
    // hText
    if ($('#hText')[0].value.toLowerCase() === 'halogens') {
        $('#hCell')[0].classList.remove('error-field');
    } else {
        $('#hCell').addClass('error-field');
    }
    // ngText
    if ($('#ngText')[0].value.toLowerCase() === 'nobel gasses') {
        $('#ngCell')[0].classList.remove('error-field');
    } else {
        $('#ngCell').addClass('error-field');
    }
    // lText
    if ($('#lText')[0].value.toLowerCase() === 'lanthanoids') {
        $('#lCell')[0].classList.remove('error-field');
    } else {
        $('#lCell').addClass('error-field');
    }
    // aText
    if ($('#aText')[0].value.toLowerCase() === 'actinoids') {
        $('#aCell')[0].classList.remove('error-field');
    } else {
        $('#aCell').addClass('error-field');
    }
}

const formToJSON = elements => [].reduce.call(elements, (data, element) => {

    data[element.id] = element.value;
    return data;

}, {});

const elements = {
    "1-1": new Element(1, 'H', 'Hydrogen', 1.00794),
    "1-18": new Element(2, 'He', 'Helium', 4.0026),
    "2-1": new Element(3, 'Li', 'Lithium', 6.941),
    "2-2": new Element(4, 'Be', 'Beryllium', 9.0122),
    "2-13": new Element(5, 'B', 'Boron', 10.811),
    "2-14": new Element(6, 'C', 'Carbon', 12.011),
    "2-15": new Element(7, 'N', 'Nitrogen', 14.0067),
    "2-16": new Element(8, 'O', 'Oxygen', 15.9994),
    "2-17": new Element(9, 'F', 'Florine', 18.998),
    "2-18": new Element(10, 'Ne', 'Neon', 20.1797),
    "3-1": new Element(11, 'Na', 'Sodium', 22.989),
    "3-2": new Element(12, 'Mg', 'Magnesium', 24.305),
    "3-13": new Element(13, 'Al', 'Aluminum', 26.981),
    "3-14": new Element(14, 'Si', 'Silicon', 28.0855),
    "3-15": new Element(15, 'P', 'Phosphorus', 30.973),
    // Add more weights. This is all that is required for phase 1.
    "3-16": new Element(16, 'S', 'Sulfur', 0.00),
    "3-17": new Element(17, 'Cl', 'Chlorine', 0.00),
    "3-18": new Element(18, 'Ar', 'Argon', 0.00),
    "4-1": new Element(19, 'K', 'Potassium', 0.00),
    "4-2": new Element(20, 'Ca', 'Calcium', 0.00),
    "4-3": new Element(21, 'Sc', 'Scandium', 0.00),
    "4-4": new Element(22, 'Ti', 'Titanium', 0.00),
    "4-5": new Element(23, 'V', 'Vanadium', 0.00),
    "4-6": new Element(24, 'Cr', 'Chromium', 0.00),
    "4-7": new Element(25, 'Mn', 'Manganese', 0.00),
    "4-8": new Element(26, 'Fe', 'Iron', 0.00),
    "4-9": new Element(27, 'Co', 'Cobalt', 0.00),
    "4-10": new Element(28, 'Ni', 'Nickel', 0.00),
    "4-11": new Element(29, 'Cu', 'Copper', 0.00),
    "4-12": new Element(30, 'Zn', 'Zinc', 0.00),
    "4-13": new Element(31, 'Ga', 'Gallium', 0.00),
    "4-14": new Element(32, 'Ge', 'Germanium', 0.00),
    "4-15": new Element(33, 'As', 'Arsenic', 0.00),
    "4-16": new Element(34, 'Se', 'Selenium', 0.00),
    "4-17": new Element(35, 'Br', 'Bromine', 0.00),
    "4-18": new Element(36, 'Kr', 'Krypton', 0.00),
    "5-1": new Element(37, 'Rb', 'Rubidium', 0.00),
    "5-2": new Element(38, 'Sr', 'Strontium', 0.00),
    "5-3": new Element(39, 'Y', 'Yttrium', 0.00),
    "5-4": new Element(40, 'Zr', 'Zirconium', 0.00),
    "5-5": new Element(41, 'Nb', 'Niobium', 0.00),
    "5-6": new Element(42, 'Mo', 'Molybdenum', 0.00),
    "5-7": new Element(43, 'Tc', 'Technetium', 0.00),
    "5-8": new Element(44, 'Ru', 'Ruthenium', 0.00),
    "5-9": new Element(45, 'Rh', 'Rhodium', 0.00),
    "5-10": new Element(46, 'Pd', 'Palladium', 0.00),
    "5-11": new Element(47, 'Ag', 'Silver', 0.00),
    "5-12": new Element(48, 'Cd', 'Cadmium', 0.00),
    "5-13": new Element(49, 'In', 'Indium', 0.00),
    "5-14": new Element(50, 'Sn', 'Tin', 0.00),
    "5-15": new Element(51, 'Sb', 'Antimony', 0.00),
    "5-16": new Element(52, 'Te', 'Tellurium', 0.00),
    "5-17": new Element(53, 'I', 'Iodine', 0.00),
    "5-18": new Element(54, 'Xe', 'Xenon', 0.00),
    "6-1": new Element(55, 'Cs', 'Cesium', 0.00),
    "6-2": new Element(56, 'Ba', 'Barium', 0.00),
    "6-3": new Element(57, 'La', 'Lanthanum', 0.00),
    "6-4": new Element(58, 'Ce', 'Cerium', 0.00),
    "6-5": new Element(59, 'Pr', 'Praseodymium', 0.00),
    "6-6": new Element(60, 'Nd', 'Neodymium', 0.00),
    "6-7": new Element(61, 'Pm', 'Promethium', 0.00),
    "6-8": new Element(62, 'Sm', 'Samarium', 0.00),
    "6-9": new Element(63, 'Eu', 'Europium', 0.00),
    "6-10": new Element(64, 'Gd', 'Gadolinium', 0.00),
    "6-11": new Element(65, 'Tb', 'Terbium', 0.00),
    "6-12": new Element(66, 'Dy', 'Dysprosium', 0.00),
    "6-13": new Element(67, 'Ho', 'Holmium', 0.00),
    "6-14": new Element(68, 'Er', 'Erbium', 0.00),
    "6-15": new Element(69, 'Tm', 'Thulium', 0.00),
    "6-16": new Element(70, 'Yb', 'Ytterbium', 0.00),
    "6-17": new Element(71, 'Lu', 'Lutetium', 0.00),
    "6-18": new Element(72, 'Hf', 'Hafnium', 0.00),
    "6-19": new Element(73, 'Ta', 'Tantalum', 0.00),
    "6-20": new Element(74, 'W', 'Tungsten', 0.00),
    "6-21": new Element(75, 'Re', 'Rhenium', 0.00),
    "6-22": new Element(76, 'Os', 'Osmium', 0.00),
    "6-23": new Element(77, 'Ir', 'Iridium', 0.00),
    "6-24": new Element(78, 'Pt', 'Platinum', 0.00),
    "6-25": new Element(79, 'Au', 'Gold', 0.00),
    "6-26": new Element(80, 'Hg', 'Mercury', 0.00),
    "6-27": new Element(81, 'Tl', 'Thallium', 0.00),
    "6-28": new Element(82, 'Pb', 'Lead', 0.00),
    "6-29": new Element(83, 'Bi', 'Bismuth', 0.00),
    "6-30": new Element(84, 'Po', 'Polonium', 0.00),
    "6-31": new Element(85, 'At', 'Astatine', 0.00),
    "6-32": new Element(86, 'Rn', 'Radon', 0.00),
    "7-1": new Element(87, 'Fr', 'Francium', 0.00),
    "7-2": new Element(88, 'Ra', 'Radium', 0.00),
    "7-3": new Element(89, 'Ac', 'Actinium', 0.00),
    "7-4": new Element(90, 'Th', 'Thorium', 0.00),
    "7-5": new Element(91, 'Pa', 'Protactinium', 0.00),
    "7-6": new Element(92, 'U', 'Uranium', 0.00),
    "7-7": new Element(93, 'Np', 'Neptunium', 0.00),
    "7-8": new Element(94, 'Pu', 'Plutonium', 0.00),
    "7-9": new Element(95, 'Am', 'Americium', 0.00),
    "7-10": new Element(96, 'Cm', 'Curium', 0.00),
    "7-11": new Element(97, 'Bk', 'Berkelium', 0.00),
    "7-12": new Element(98, 'Cf', 'Californium', 0.00),
    "7-13": new Element(99, 'Es', 'Einsteinium', 0.00),
    "7-14": new Element(100, 'Fm', 'Fermium', 0.00),
    "7-15": new Element(101, 'Md', 'Mendelevium', 0.00),
    "7-16": new Element(102, 'No', 'Nobelium', 0.00),
    "7-17": new Element(103, 'Lr', 'Lawrencium', 0.00),
    "7-18": new Element(104, 'Rf', 'Rutherfordium', 0.00),
    "7-19": new Element(105, 'Db', 'Dubnium', 0.00),
    "7-20": new Element(106, 'Sg', 'Seaborgium', 0.00),
    "7-21": new Element(107, 'Bh', 'Bohrium', 0.00),
    "7-22": new Element(108, 'Hs', 'Hassium', 0.00),
    "7-23": new Element(109, 'Mt', 'Meitnerium', 0.00),
    "7-24": new Element(110, 'Ds', 'Darmstadtium', 0.00),
    "7-25": new Element(111, 'Rg', 'Roentgenium', 0.00),
    "7-26": new Element(112, 'Cn', 'Copernicium', 0.00),
    "7-27": new Element(113, 'Nh', 'Nihonium', 0.00),
    "7-28": new Element(114, 'Fl', 'Flerovium', 0.00),
    "7-29": new Element(115, 'Mc', 'Moscovium', 0.00),
    "7-30": new Element(116, 'Lv', 'Livermorium', 0.00),
    "7-31": new Element(117, 'Ts', 'Tennessine', 0.00),
    "7-32": new Element(118, 'Og', 'Oganesson', 0.00),
};
