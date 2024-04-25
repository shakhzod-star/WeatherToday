<script>
import { customRef } from 'vue'
function useDebounce(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
}
import axios from 'axios'
export default {
  data() {
    return {
      weatherData: {},
      fiveDatsData: {},
      api_key: '29b179e74ff420783249b39ebbffc009',
      search: useDebounce('ташкент', 1000),
    }
  },

  methods: {
    useDebounce(value, delay = 200) {
      let timeout
      return customRef((track, trigger) => {
        return {
          get() {
            track()
            return value
          },
          set(newValue) {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
              value = newValue
              trigger()
            }, delay)
          },
        }
      })
    },
    toggleTheme() {
      document.body.classList.toggle('dark-mode')
    },
    timeDate(val) {
      const dtMilliseconds = val * 1000
      const dtDate = new Date(dtMilliseconds)
      const hours = String(dtDate.getHours()).padStart(2, '0')
      const minutes = String(dtDate.getMinutes()).padStart(2, '0')
      const output = `${hours}:${minutes}`
      return output
    },
    async getData() {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.search}&appid=${this.api_key}&exclude=minutely&lang=ru&units=metric`
        )
        .then((res) => {
          this.weatherData = res.data
        })

      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${this.weatherData?.coord?.lat}&lon=${this.weatherData?.coord?.lon}&appid=${this.api_key}&cnt=4&lang=ru&units=metric`
        )
        .then((res) => {
          this.fiveDatsData = res.data
        })
    },
    linkIcon(val) {
      return `https://openweathermap.org/img/wn/${val}.png`
    },
    getWeek(val) {
      const timestampMilliseconds = val * 1000
      const dateObject = new Date(timestampMilliseconds)
      const formattedDateString = dateObject.toLocaleDateString('ru-RU', {
        weekday: 'long',
      })
      return formattedDateString
    },
    getDate(val) {
      const timestampMilliseconds = val * 1000
      const dateObject = new Date(timestampMilliseconds)
      const formattedDateString = dateObject.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
      })
      const hours = dateObject.getHours()
      const minutes = dateObject.getMinutes()
      return `${formattedDateString} , ${hours}:${minutes} `
    },
  },
  watch: {
    search(newValue, oldValue) {
      this.getData()
    },
  },
  mounted() {
    this.getData()
    console.log(new Date())
  },
}
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
          <input
            class="choosecity"
            v-model="search"
            type="text"
            placeholder="Выбрать город"
          />
        </div>
      </div>
      <div class="bodyPart">
        <div class="todayWeather">
          <div class="todayWeatherChild">
            <div class="todayWeatherTop">
              <p class="temperature">
                {{
                  weatherData?.main?.temp
                    ? Math.round(weatherData?.main?.temp)
                    : ''
                }}°
              </p>
              <p class="today">Сегодня</p>
            </div>
            <img :src="linkIcon(weatherData?.weather?.[0]?.icon)" alt="" />
          </div>
          <div class="time">
            Время : {{ weatherData?.dt ? timeDate(weatherData.dt) : '' }}
          </div>
          <div class="city">Город: {{ weatherData?.name }}</div>
        </div>
        <div class="todayAddingNews">
          <div class="ListAddingNews">
            <div class="list">
              <div class="listImg">
                <img src="../static/img/tempreture.svg" alt="" />
              </div>
              <div class="listName">Температура</div>
              <div class="listValue">
                {{ weatherData?.main?.temp }}° - ощущается как
                {{ weatherData?.main?.feels_like }}°
              </div>
            </div>
            <div class="list">
              <div class="listImg">
                <img src="../static/img/pressure.svg" alt="" />
              </div>
              <div class="listName">Давление</div>
              <div class="listValue">{{ weatherData?.main?.pressure }} гПа</div>
            </div>
            <div class="list">
              <div class="listImg">
                <img src="../static/img/precipitation.svg" alt="" />
              </div>
              <div class="listName">Осадки</div>
              <div class="listValue">
                {{
                  weatherData?.clouds?.all
                    ? `${weatherData?.clouds?.all}%`
                    : 'Без осадков'
                }}
              </div>
            </div>
            <div class="list">
              <div class="listImg">
                <img src="../static/img/wind.svg" alt="" />
              </div>
              <div class="listName">Ветер</div>
              <div class="listValue">{{ weatherData?.wind?.speed }} м/с</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="fiveDatsData?.list?.length > 0" class="dayByWeek">
        <div v-for="item in fiveDatsData?.list" :key="item" class="weatherList">
          <div class="day">{{ getWeek(item?.dt) }}</div>
          <div class="date">{{ getDate(item?.dt) }}</div>
          <div class="image">
            <img
              style="height: 48px; width: 48px"
              :src="linkIcon(item?.weather?.[0]?.icon)"
              alt=""
            />
          </div>
          <div class="firstTemprature">
            {{ item?.main?.temp ? Math.round(item?.main?.temp) : '' }} °
          </div>
          <div class="secondTemprature">
            {{
              item?.main?.feels_like ? Math.floor(item?.main?.feels_like) : ''
            }}
            °
          </div>
          <div class="weatherHow">{{ item?.weather?.[0]?.description }}</div>
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
          font-family: 'm-bold';
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
          font-family: 'm-medium';
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
              font-family: 'm-medium';
              font-weight: 500;
              font-size: 96px;
              color: #4793ff;
              margin: 0;
            }
            .today {
              font-family: 'm-regular';
              font-weight: 400;
              font-size: 40px;
              color: #000;
              margin: 0;
            }
          }
        }
        .time {
          font-family: 'm-regular';
          font-weight: 400;
          font-size: 25px;
          color: #939cb0;
          margin-bottom: 14px;
        }
        .city {
          font-family: 'm-regular';
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
        background-image: url('../static/img/CloudImage.png');
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
              font-family: 'm-regular';
              font-weight: 400;
              font-size: 14px;
              text-align: right;
              color: #939cb0;
              margin-right: 20px;
            }
            .listValue {
              font-family: 'm-regular';
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
          font-family: 'm-medium';
          font-weight: 500;
          text-transform: capitalize;
          font-size: 18px;
          color: #000;
        }
        .date {
          font-family: 'm-regular';
          text-transform: capitalize;
          font-weight: 400;
          font-size: 14px;
          color: #939cb0;
        }
        .image {
          width: 48px;
          height: 48px;
        }
        .firstTemprature {
          font-family: 'm-medium';
          font-weight: 500;
          font-size: 18px;
          color: #000;
        }
        .secondTemprature {
          font-family: 'm-regular';
          font-weight: 400;
          font-size: 13px;
          color: #939cb0;
        }
        .weatherHow {
          font-family: 'm-regular';
          text-transform: capitalize;
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
