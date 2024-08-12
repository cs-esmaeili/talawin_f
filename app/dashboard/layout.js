'use client'
import { Provider } from "react-redux";
import { store } from "@/state/store";

export default function Layout({ children }) {

  return (
    <section>
      <Provider store={store}>
        {children}
      </Provider>
    </section>
  )
}
