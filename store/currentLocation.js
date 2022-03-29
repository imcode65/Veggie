const getDefaultState = () => ({
  //現在地情報は取得するのに時間がかかるため
  //ストアで保持する。
  currentLocation: {
    latitude: undefined,
    longitude: undefined,
  },
});

const state = () => ({
  //現在地情報は取得するのに時間がかかるため
  //ストアで保持する。
  currentLocation: {
    latitude: undefined,
    longitude: undefined,
  },
});;

const mutations = {
  SET_CURRENT_LOCATION(state, payload) {
    state.currentLocation.latitude = payload.latitude;
    state.currentLocation.longitude = payload.longitude;
  },
  RESET_STATE_CURRENTLOCATION(state) {
    Object.assign(state, getDefaultState());
  },
};

const actions = {
  getLastLocation({ commit, state, dispatch }) {
    const defaultLocation = {
      latitude: undefined,
      longitude: undefined,
    };
    if (window.localStorage.getItem("lastLocation") !== null) {
      const lastLocation = JSON.parse(
        window.localStorage.getItem("lastLocation")
      );
      commit("SET_CURRENT_LOCATION", lastLocation);
      return;
    }
    commit("SET_CURRENT_LOCATION", defaultLocation);
  },
  async updateCurrentLocation({ commit, dispatch, state }) {
    let location = {
      latitude: undefined,
      longitude: undefined,
    };
    if (navigator.geolocation) {
      try {
        const response = await getCurrentPosition();
        location.latitude = response.coords.latitude;
        location.longitude = response.coords.longitude;
        // console.log('===========CURRENT LOCATION=============');
        // console.log(location)
        commit("SET_CURRENT_LOCATION", location);
      } catch (error) {
        // console.log('===========LOCATION ERROR=============');
        // console.log(error)
        switch (error.code) {
          case 1: //PERMISSION_DENIED
            alert("位置情報の利用が許可されていません");
            break;
          case 2: //POSITION_UNAVAILABLE
            alert("現在位置が取得できませんでした");
            break;
          case 3: //TIMEOUT
            alert("タイムアウトになりました");
            break;
          default:
            alert("現在位置が取得できませんでした");
            break;
        }
      }
    }
    if (location.latitude !== undefined) {
      commit("SET_CURRENT_LOCATION", location);
      window.localStorage.setItem(
        "lastLocation",
        JSON.stringify(state.currentLocation)
      );
      dispatch("directSales/directSalesList/setDirectSalesDistance", null, {
        root: true,
      });
    }
  },
};

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
const getters = {
  currentLocation: (state) => state.currentLocation,
};

const currentLocationModule = {
  state,
  mutations,
  actions,
  getters,
};

export default currentLocationModule;
