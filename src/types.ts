type Input = {
    name: string
    type: string
    placeholder: string
}

type ButtonProps = {
    type: 'submit' | 'button' | 'reset' | undefined
    children: React.ReactNode
    onClick?: () => void
    className?: string
}
interface User {
    email: string;
    phoneNumber: string;
    fullName: string;
    password: string;
    role?: string;
  }
  