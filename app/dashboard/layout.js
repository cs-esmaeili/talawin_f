'use client'
import { Provider } from "react-redux";
import { store } from "@/state/store";

export default function Layout({ children }) {

  return (
    <html lang="en">
      <Provider store={store}>
        <body>{children}</body>
      </Provider>
    </html>
  )
}
