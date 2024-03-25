import React, { useEffect, useRef, useState } from "react"
import { auth } from "../firebase"

interface AuthContextType {
  loading: boolean
  signInWithGoogle: () => void
  signOut: () => void
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType)
