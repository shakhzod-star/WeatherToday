<!-- Please remove this file from your project -->
<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";

const toggleTheme = () => {
  document.body.classList.toggle("dark-mode");
};
onMounted(() => {
  const store = useStore(); // useStore should now correctly access the Vuex store
  // say = computed(() => store.state);
  console.log(111, store);
});
</script>
<template>
  <div class="mainMode">
    <div class="container scrollbarActive">
      <div class="navbar">
        <div class="logo">
          <img src="../static/img/weatherLogo.svg" alt="" />
          <h1>VUE WEATHER</h1>
        </div>
        <div class="mode_and_choosecity">
          <button @click="toggleTheme" class="mode">
            <img src="../static/img/mode.svg" alt="" />
          </button>
          <button class="choosecity">Выбрать город</button>
        </div>
      </div>
      <div class="bodyPart">
        <div class="todayWeather">
          <div class="todayWeatherChild">
            <div class="todayWeatherTop">
              <p class="temperature">20°</p>
              <p class="today">Сегодня</p>
            </div>
            <img src="../static/img/sunshine.svg" alt="" />
          </div>
          <div class="time">Время : 21:54</div>
          <div class="city">Город: Санкт-Петербург</div>
        </div>
        <div class="todayAddingNews">
          <div class="ListAddingNews">
            <div class="list">
              <div class="listImg">
                <img src="../static/img/tempreture.svg" alt="" />
              </div>
              <div class="listName">Ветер</div>
              <div class="listValue">3 м/с юго-запад - легкий ветер</div>
            </div>
            <div class="list">
              <div class="listImg">
                <img src="../static/img/tempreture.svg" alt="" />
              </div>
              <div class="listName">Ветер</div>
              <div class="listValue">3 м/с юго-запад - легкий ветер</div>
            </div>
            <div class="list">
              <div class="listImg">
                <img src="../static/img/tempreture.svg" alt="" />
              </div>
              <div class="listName">Ветер</div>
              <div class="listValue">3 м/с юго-запад - легкий ветер</div>
            </div>
            <div class="list">
              <div class="listImg">
                <img src="../static/img/tempreture.svg" alt="" />
              </div>
              <div class="listName">Ветер</div>
              <div class="listValue">3 м/с юго-запад - легкий ветер</div>
            </div>
          </div>
        </div>
      </div>
      <div class="dayByWeek">
        <div v-for="item in 7" :key="item" class="weatherList">
          <div class="day">Сегодня</div>
          <div class="date">28 авг</div>
          <div class="image"><img src="" alt="" /></div>
          <div class="firstTemprature">+18°</div>
          <div class="secondTemprature">+15°</div>
          <div class="weatherHow">Облачно</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mainMode {
  background-color: #fff;
  height: 100%;
  .container {
    max-width: 1200px;
    width: 100%;
    padding: 0 20px 20px 20px;
    overflow-y: auto;
    margin: 0 auto;
    height: 100%;
    .navbar {
      margin-bottom: 30px;
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .logo {
        display: flex;
        justify-content: start;
        align-items: center;
        h1 {
          margin-left: 20px;
          font-family: "m-bold";
          font-weight: 700;
          font-size: 25px;
          text-transform: uppercase;
          color: #4793ff;
        }
      }
      .mode_and_choosecity {
        display: flex;
        align-items: center;

        img {
          width: 35px;
          height: 35px;
          margin-right: 20px;
        }
        .mode {
          cursor: pointer;
          padding: 0;
          border: none;
          background: none;
        }
        .choosecity {
          cursor: pointer;
          border-radius: 10px;
          color: black;
          background-color: rgba(71, 147, 255, 0.2);
          border: none;
          padding: 9px 20px;
          display: flex;
          justify-content: center;
          font-family: "m-medium";
          font-weight: 500;
          font-size: 16px;
          color: #000;
        }
      }
    }
    .bodyPart {
      display: flex;
      margin-bottom: 47px;
      justify-content: space-between;
      width: 100%;
      .todayWeather {
        display: flex;
        flex-direction: column;
        width: 400px;
        min-width: 400px;
        max-width: 400px;
        margin-right: 50px;
        border-radius: 20px;
        box-shadow: 2px 5px 25px -3px rgba(180, 180, 180, 0.25);
        background: transparent;
        padding: 20px;
        .todayWeatherChild {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
          img {
            width: 120px;
            height: 120px;
          }
          .todayWeatherTop {
            display: flex;
            flex-direction: column;
            align-items: start;
            .temperature {
              font-family: "m-medium";
              font-weight: 500;
              font-size: 96px;
              color: #4793ff;
              margin: 0;
            }
            .today {
              font-family: "m-regular";
              font-weight: 400;
              font-size: 40px;
              color: #000;
              margin: 0;
            }
          }
        }
        .time {
          font-family: "m-regular";
          font-weight: 400;
          font-size: 25px;
          color: #939cb0;
          margin-bottom: 14px;
        }
        .city {
          font-family: "m-regular";
          font-weight: 400;
          font-size: 25px;
          color: #939cb0;
        }
      }
      .todayAddingNews {
        padding: 42px 32px;
        width: 100%;
        border-radius: 20px;
        box-shadow: 2px 5px 25px -3px rgba(180, 180, 180, 0.25);
        background: #fff;
        background-image: url("../static/img/CloudImage.png");
        background-position: right top;
        background-repeat: no-repeat;
        .ListAddingNews {
          display: flex;
          flex-direction: column;
          align-items: start;

          .list {
            display: flex;
            align-items: center;
            justify-content: start;
            margin-bottom: 24px;
            .listImg {
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 100%;
              width: 38px;
              height: 38px;
              background: #fff;
              box-shadow: 1px 4px 10px -1px rgba(71, 147, 255, 0.2);
              margin-right: 20px;
            }
            .listName {
              font-family: "m-regular";
              font-weight: 400;
              font-size: 14px;
              text-align: right;
              color: #939cb0;
              margin-right: 20px;
            }
            .listValue {
              font-family: "m-regular";
              font-weight: 400;
              font-size: 14px;
              color: #000;
            }
          }
        }
      }
    }
    .dayByWeek {
      border-radius: 20px;
      box-shadow: 2px 5px 25px -3px rgba(180, 180, 180, 0.25);
      gap: 20px;
      padding: 20px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      .weatherList {
        border-radius: 10px;
        padding: 11px;
        background: rgba(71, 147, 255, 0.2);
        .day {
          font-family: "m-medium";
          font-weight: 500;
          font-size: 18px;
          color: #000;
        }
        .date {
          font-family: "m-regular";
          font-weight: 400;
          font-size: 14px;
          color: #939cb0;
        }
        .image {
          width: 48px;
          height: 48px;
        }
        .firstTemprature {
          font-family: "m-medium";
          font-weight: 500;
          font-size: 18px;
          color: #000;
        }
        .secondTemprature {
          font-family: "m-regular";
          font-weight: 400;
          font-size: 13px;
          color: #939cb0;
        }
        .weatherHow {
          font-family: "m-regular";
          font-weight: 400;
          font-size: 13px;
          color: #939cb0;
        }
      }
    }
  }
}

.dark-mode .mainMode {
  background-color: rgba(0, 0, 0, 0.81);
}
.dark-mode .choosecity,
.dark-mode .today,
.dark-mode .listValue,
.dark-mode .cancel,
.dark-mode .day,
.dark-mode .firstTemprature {
  color: #fff !important;
}
.dark-mode .todayWeather,
.dark-mode .todayAddingNews,
.dark-mode .listImg,
.dark-mode .cancel,
.dark-mode .dayByWeek {
  background-color: rgba(0, 0, 0, 0.2) !important;
}

@media (max-width: 1000px) {
  .mainMode .bodyPart {
    flex-direction: column !important;
    width: 100% !important;
  }
  .mainMode .todayWeather {
    min-width: none !important;
    max-width: none !important;
    width: 100% !important;
    margin-bottom: 20px !important;
  }
}
@media (max-width: 1000px) {
  .navbar {
    flex-direction: column !important;
  }
  .navbar .logo {
    margin-bottom: 16px !important;
  }
}
</style>
