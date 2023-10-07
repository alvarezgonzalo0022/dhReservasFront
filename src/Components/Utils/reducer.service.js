export const initialState = {
  listAutosUbi: [],
  usuario: JSON.parse(localStorage.getItem("user")),
  menuPhone: false,
  galeriaImagenes: false,
  mensajeLogin: false,
  quitarFiltro: false,
  login: JSON.parse(localStorage.getItem("token")),
};

export const actions = {
  SET_USUARIO_IN: "SET_USUARIO_IN",
  SET_USUARIO_OUT: "SET_USUARIO_OUT",
  SET_MENSAJELOGIN_IN: "SET_MENSAJELOGIN_IN",
  SET_MENSAJELOGIN_OUT: "SET_MENSAJELOGIN_OUT",
  SET_QUITARFILTRO_IN: "SET_QUITARFILTRO_IN",
  SET_QUITARFILTRO_OUT: "SET_QUITARFILTRO_OUT",
  SET_LISTAUTOSUBI_IN: "SET_LISTAUTOSUBI_IN",
  SET_GALERIAIMAGENES_IN: "SET_GALERIAIMAGENES_IN",
  SET_GALERIAIMAGENES_OUT: "SET_GALERIAIMAGENES_OUT",
  SET_MENUPHONE_IN: "SET_MENUPHONE_IN",
  SET_MENUPHONE_OUT: "SET_MENUPHONE_OUT",
  SET_LOGIN: "SET_LOGIN",
  SET_LOGOUT: "SET_LOGOUT",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_USUARIO_IN:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, usuario: action.payload };
    case actions.SET_USUARIO_OUT:
      localStorage.removeItem("user");
      return { ...state, usuario: action.payload };
    case actions.SET_MENSAJELOGIN_IN:
      return { ...state, mensajeLogin: true };
    case actions.SET_MENSAJELOGIN_OUT:
      return { ...state, mensajeLogin: false };
    case actions.SET_LISTAUTOSUBI_IN:
      return { ...state, listAutosUbi: [action.payload] };
    case actions.SET_MENUPHONE_IN:
      return { ...state, menuPhone: false };
    case actions.SET_MENUPHONE_OUT:
      return { ...state, menuPhone: true };
    case actions.SET_QUITARFILTRO_IN:
      return { ...state, quitarFiltro: true };
    case actions.SET_QUITARFILTRO_OUT:
      return { ...state, quitarFiltro: false };
    case actions.SET_GALERIAIMAGENES_IN:
      return { ...state, galeriaImagenes: false };
    case actions.SET_GALERIAIMAGENES_OUT:
      return { ...state, galeriaImagenes: true };
    case actions.SET_LOGIN:
      localStorage.setItem("token", JSON.stringify(action.payload));
      return { ...state, login: action.payload };
    case actions.SET_LOGOUT:
      localStorage.removeItem("token");
      return { ...state, login: action.payload };
    default:
      return state;
  }
};
