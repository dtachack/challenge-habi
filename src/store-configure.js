import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

import { asyncMiddleware } from "./shared/store/middlewares/async";
import { appReducers } from "./store";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const presistedReducer = persistReducer(
  {
    key: "root",
    storage,
    transforms: [
      encryptTransform({
        secretKey:
          "$4a$07$LQ3b64jdohKBJqoW9qbjBO5zDiw6Qk4UmBqlC024pp3cvfsp3btD.",
        onError: function (error) {
          console.log(error);
        },
      }),
    ],
    whitelist: ["information"],
  },
  appReducers
);

const store = createStore(
  presistedReducer,
  composeEnhancers(applyMiddleware(asyncMiddleware))
);
const persistor = persistStore(store);
export { persistor, store };
