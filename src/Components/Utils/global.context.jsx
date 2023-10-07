import { createContext, useMemo, useReducer } from "react";
import { actions, initialState, reducer } from "./reducer.service";

export const ContextGlobal = createContext(undefined);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const providerState = useMemo(
    () => ({
      usuario: state.usuario,
      listAutosUbi: state.listAutosUbi,
      galeriaImagenes: state.galeriaImagenes,
      menuPhone: state.menuPhone,
      mensajeLogin: state.mensajeLogin,
      quitarFiltro: state.quitarFiltro,
      login: state.login,
      setInUsuario: (cliente) => {
        dispatch({ type: actions.SET_USUARIO_IN , payload:cliente});
      },
      setOutUsuario: (cliente) => {
        dispatch({ type: actions.SET_USUARIO_OUT , payload:cliente});
      },
      setInMensajeLogin: () => {
        dispatch({ type: actions.SET_MENSAJELOGIN_IN });
      },
      setOutMensajeLogin: () => {
        dispatch({ type: actions.SET_MENSAJELOGIN_OUT });
      },
      setInListAutosUbi: (ubicacion) => {
        dispatch({ type: actions.SET_LISTAUTOSUBI_IN , payload:ubicacion});
      },
      setInGaleriaImagenes: () => {
        dispatch({ type: actions.SET_GALERIAIMAGENES_IN });
      },
      setOutGaleriaImagenes: () => {
        dispatch({ type: actions.SET_GALERIAIMAGENES_OUT });
      },
      setInMenuPhone: () => {
        dispatch({ type: actions.SET_MENUPHONE_IN });
      },
      setOutMenuPhone: () => {
        dispatch({ type: actions.SET_MENUPHONE_OUT });
      },
      setInQuitarFiltro: () => {
        dispatch({ type: actions.SET_QUITARFILTRO_IN });
      },
      setOutQuitarFiltro: () => {
        dispatch({ type: actions.SET_QUITARFILTRO_OUT });
      },
      setLogin: (token) => {
        dispatch({ type: actions.SET_LOGIN,  payload:token});
      },
      setLogout: (token) => {
        dispatch({ type: actions.SET_LOGOUT,  payload:token});
      },
    }),
    [state.menuPhone, state.login, state.galeriaImagenes, state.listAutosUbi, state.mensajeLogin, state.usuario, state.quitarFiltro]
  );

  return (
    <ContextGlobal.Provider value={providerState}>
      {children}
    </ContextGlobal.Provider>
  );
};
