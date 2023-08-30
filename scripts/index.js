const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    gotoBtn = document.querySelector(".goto-btn"),
    todayBtn = document.querySelector(".today-btn"),
    dateInput = document.querySelector(".date-input"),
    eventDay = document.querySelector(".event-day"),
    eventDate = document.querySelector(".event-date"),
    eventsContainer = document.querySelector(".events"),
    eventTitle = document.querySelector(".event-name "),
    eventFrom = document.querySelector(".event-time-from"),
    eventTo = document.querySelector(".event-time-to "),
    addEventSubmit = document.querySelector(".add-event-btn ");


let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
];

var dias = [
    "Domingo", 
    "Segunda", 
    "Terça", 
    "Quarta", 
    "Quinta", 
    "Sexta", 
    "Sábado"
];

// const eventsArr = [
//   {
//     day: 15,
//     month: 8,
//     year: 2023,
//     events: [
//       {
//         title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
//         time: "10:00 AM",
//       },
//       {
//         title: "Event 2",
//         time: "11:00 AM",
//       },
//     ],
//   },
// ];

//Cria um array vazio
let eventsArr = [];

//Depois starta os eventos
getEvents();


// Função para adicionar os dias
function initCalendar() {
    // Pega dias do mês anterior, todos os dias do mês atual e os dias do mês seguinte
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    // Atualiza data no topo do calendário
    date.innerHTML = months[month] + " " + year;

    // Adicionando os dias no calendário
    let days = "";

    // Dias do mês anterior
    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x +1}</div>`;
    }

    //Dias do mês atual

    for (let i = 1; i <= lastDate; i++) {

        //Checa se o evento atual é do dia atual

        let event = false;
        eventsArr.forEach((eventObj) => {
        if (
            eventObj.day === i &&
            eventObj.month === month + 1 &&
            eventObj.year === year
        ) {
            //Se algum evento for encontrado
            event = true;
        }
        });

        //Se o dia é hoje adiciona a classe today
        if(
            i === new Date().getDate() && 
            year === new Date().getFullYear() && 
            month === new Date().getMonth()
          ) {
            activeDay = i;
            getActiveDay(i);
            updateEvents(i);

            // Se o evento for encontrado adiciona a classe event
            //Adiciona active no today quando começar
            if (event) {
                days += `<div class="day today active event">${i}</div>`;
            } else {
                days += `<div class="day active today">${i}</div>`;
            }
        }
            //Adicionando o restante
            else {
                if (event) {
                days += `<div class="day event">${i}</div>`;
            } else {
                days += `<div class="day">${i}</div>`;
            }
        }
}

    // Dias do mês seguinte
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }

    daysContainer.innerHTML = days;

    //Adiciona listener depois de o calendario inicializar
    addListener();
}

initCalendar();


//Mês anterior
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

//Mês seguinte
function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

//Adiciona função nas teclas de prev e next

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

//Funcionalidade de ir para data e para hoje

todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("input", (e) => {
    //Essa linha permite somente números e remove qualquer outra coisa
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    //Depois de dois números
    if (dateInput.value.length === 2) {
        //Adiciona uma barra
        dateInput.value += "/";
    }
    //Se oque for digitado for menor que 7 caracteres
    if (dateInput.value.length > 7) {
      dateInput.value = dateInput.value.slice(0, 7);
    }
    //Se Backspace for pressionado
    if (e.inputType === "deleteContentBackward") {
      if (dateInput.value.length === 3) {
        dateInput.value = dateInput.value.slice(0, 2);
      }
    }
  });

  gotoBtn.addEventListener("click", gotoDate);

  //Função de ir para data que foi digitada

  function gotoDate() {
    const dateArr = dateInput.value.split("/");

    if (dateArr.length === 2) {
        if(dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    //Se a data for inválida
    alert("Data Inválida" + "\n" + "Digite Mês/Ano" + "\n" + "Exemplo: 02/2023");
}

const addEventBtn = document.querySelector(".add-event"),
    addEventContainer = document.querySelector(".add-event-wrapper"),
    addEventCloseBtn = document.querySelector(".close"),
    addEventTitle = document.querySelector(".event-name"),
    addEventFrom = document.querySelector(".event-time-from"),
    addEventTo = document.querySelector(".event-time-to");

    //Adiciona a classe de active
    addEventBtn.addEventListener("click" || "touch", () => {
        addEventContainer.classList.toggle("active");
    });
    
    //Remove a classe de active
    addEventCloseBtn.addEventListener("click", () => {
    addEventContainer.classList.remove("active");
    });

//     document.addEventListener("click", (e) => {
//     //Se o usuário clicar fora do card de Evento ele fecha automaticamente
//     if (e.target !== addEventBtn && !addEventContainer.contains(e.target)) {
//         addEventContainer.classList.remove("active");
//     }
// });

//Permite só 50 caracteres no titulo do evento
addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 50);
})

//Formato de hora De
addEventFrom.addEventListener("input", (e) => {
    //Essa linha permite somente números e remove qualquer outra coisa
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    //Se oque for digitado for 2 caracteres
    if (addEventFrom.value.length === 2) {
        //Adiciona uma barra
        addEventFrom.value += ":";
    }
    //Não deixa usuario digitar mais que 5 caracteres
    if (addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
    //Se Backspace for pressionado
    if (e.inputType === "deleteContentBackward") {
        if (addEventFrom.value.length === 3) {
            addEventFrom.value = addEventFrom.value.slice(0, 2);
        }
      }
});

//Formato de hora Para
addEventTo.addEventListener("input", (e) => {
    //Essa linha permite somente números e remove qualquer outra coisa
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    //Se oque for digitado for 2 caracteres
    if (addEventTo.value.length === 2) {
        //Adiciona uma barra
        addEventTo.value += ":";
    }
    //Não deixa usuario digitar mais que 5 caracteres
    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
    //Se Backspace for pressionado
    if (e.inputType === "deleteContentBackward") {
        if (addEventTo.value.length === 3) {
            addEventTo.value = addEventTo.value.slice(0, 2);
        }
      }
});

//Função para adicionar event nas datas
function addListener() {
    const days = document.querySelectorAll(".day");
    //Para cada dia no mês
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            //Seta o dia atual como active
            activeDay = Number(e.target.innerHTML);

            //Chama função activeDay depois de clicar
            getActiveDay(e.target.innerHTML);
            updateEvents(Number(e.target.innerHTML));
            activeDay = Number(e.target.innerHTML);

            //Remove ativo de um dia já active
            days.forEach((day) => {
                day.classList.remove("active");
            });

            //Se um dia do mês anterior for clicado vai pro mês anterior e adiciona active

            if(e.target.classList.contains("prev-date")) {
                prevMonth();
                //Seleciona todos dias daquele mês
                setTimeout(() => {
                    const days = document.querySelectorAll(".day");
                    
                    //Depois de ir para o mês anterior adiciona a classe active quando clicado
                    days.forEach((day) => {
                        if(!day.classList.contains("prev-date") &&
                          day.innerHTML === e.target.innerHTML
                        ) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            } else if(e.target.classList.contains("next-date")) {
                nextMonth();
                //Seleciona todos dias daquele mês
                setTimeout(() => {
                    const days = document.querySelectorAll(".day");
                    
                    //Depois de ir para o mês seguinte adiciona a classe active quando clicado
                    days.forEach((day) => {
                        if(!day.classList.contains("next-date") &&
                          day.innerHTML === e.target.innerHTML
                        ) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            } 
            else {
                //Dias restantes do mês atual
                e.target.classList.add("active");
            }
        });
    });
}

//Mostra os eventos do dia ativo e a data no topo
function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayName = day.toString("").split(" ")[0];

    //Converte os dias da semana pra pt-BR
    if (dayName === "Sun") {
        diaSemana = dias[0];
    } else 
    if (dayName === "Mon") {
        diaSemana = dias[1];
    } else 
    if (dayName === "Tue") {
        diaSemana = dias[2];
    } else 
    if (dayName === "Wed") {
        diaSemana = dias[3];
    } else 
    if (dayName === "Thu") {
        diaSemana = dias[4];
    } else 
    if (dayName === "Fri") {
        diaSemana = dias[5];
    } else 
    if (dayName === "Sat") {
        diaSemana = dias[6];
    }
    eventDay.innerHTML = diaSemana.slice(0,3);
    eventDate.innerHTML = date + " " + months[month] + " " + year;
}

//Função para mostrar eventos daquele dia

function updateEvents(date) {
    let events = "";
    eventsArr.forEach((event) => {
        //Pega somente eventos do dia ativo
        if (
            date === event.day &&
            month + 1 === event.month &&
            year === event.year
        ) {
            //Então mostra o evento
            event.events.forEach((event) => {
                events += `<div class="event">
                <div class="title">
                  <i class="fas fa-circle"></i>
                  <h3 class="event-title">${event.title}</h3>
                </div>
                <div class="event-time">
                  <span class="event-time">${event.time}</span>
                </div>
            </div>`;
            });
        }
    });

    // Se nada for encontrado

    if (events === "") {
        events = `<div class="no-event">
                <h3>Sem tarefas</h3>
            </div>`;
      }
    eventsContainer.innerHTML = events;
    //Salva eventos quando atualizar eventos for chamado
    saveEvents();
}

addEventSubmit.addEventListener("click", () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;

    //Validação se os campos estão preenchidos

    if (
        eventTitle === "" || 
        eventTimeFrom === "" || 
        eventTimeTo === ""
    ) {
        alert("Por favor preencha todos os campos");
    }

    const timeFromArr = eventTimeFrom.split(":");
    const timeToArr = eventTimeTo.split(":");

    if (
        timeFromArr.length !== 2 ||
        timeToArr.length !== 2 ||
        timeFromArr[0] > 23 ||
        timeFromArr[1] > 59 ||
        timeToArr[0] > 23 ||
        timeToArr[1] > 59
    ) {
        alert("Formato de data inválido");
        return;
    }

    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);

    const newEvent = {
        title: eventTitle,
        time: timeFrom + " - " + timeTo,
    };

    let eventAdded = false;

    //Checa se eventsarr não está vazio
    if (eventsArr.length > 0) {
        //Checa se o dia atual já tem algum evento adicionado a ele
        eventsArr.forEach((item) => {
            if (
                item.day === activeDay &&
                item.month === month + 1 &&
                item.year === year
            ) {
                item.events.push(newEvent);
                eventAdded = true
            }
        });
    }


    //Se o array do evento ou o dia atual não tem evento, crie um
    if(!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [newEvent],
        });
    }

    //Remove active do form de criar eventos
    addEventContainer.classList.remove("active")
    //Limpa os campos
    eventTitle.value = ""; 
    eventFrom.value = ""; 
    eventTo.value = ""; 

    //Mostra eventos adicionados
    updateEvents(activeDay);

    //Adiciona a clase event aos novos dias adicionados se já não estiverem
    
    const activeDayElem = document.querySelector(".day.active");
    if (!activeDayElem.classList.contains("event")) {
        activeDayElem.classList.add("event");
    }
});

function convertTime(time) {
    //Converte a hora para o formato de 24 horas
    let timeArr = time.split(":");
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    timeHour = timeHour % 12 || 12;

    //Monta a string da hora || Ex: "12:56 AM"
    time = timeHour + ":" + timeMin + " " + timeFormat;

    //Se os minutos forem 00 ou vazio, formata hora
    if (timeMin === "" || timeMin === "00") {
        time = timeHour + " " + timeFormat;
    }
    return time;
}

//Função para remover eventos quando clicar
eventsContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains("event")) {
        const eventTitle = e.target.children[0].children[1].innerHTML;
        //Pega o titulo do evento, procura no array pelo titulo e deleta
        eventsArr.forEach((event) => {
            if (
                event.day === activeDay &&
                event.month === month + 1 &&
                event.year === year
            ) {
                event.events.forEach((item, index) => {
                    if(item.title === eventTitle) {
                        event.events.splice(index, 1);
                    }
                });

                //Se não tiver mais evento no dia atual remove tudo

                if (event.events.length === 0) {
                    eventsArr.splice(eventsArr.indexOf(event), 1);
                    //Depois de remover tudo, tira a classe active do dia
                    const activeDayElem = document.querySelector(".day.active");
                    if (activeDayElem.classList.contains("event")) {
                        activeDayElem.classList.remove("event");
                    }
                }
            }
        });
        //Depois de remover atualiza os eventos
        updateEvents(activeDay);
    }
})

//Armazenar tasks e eventos no local storage do usuario+
function saveEvents() {
    localStorage.setItem("events", JSON.stringify(eventsArr));
}

//Função que pega os eventos do local storage
function getEvents() {
    //Checa se já tem tasks ou eventos salvos no local storage e traz, senão não faz nada
    if (localStorage.getItem("events") === null) {
      return;
    }
    eventsArr.push(...JSON.parse(localStorage.getItem("events")));
  }