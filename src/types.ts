type InputProps = {
  name: string;
  type: string;
  placeholder: string;
};

type ButtonProps = {
  type: "submit" | "button" | "reset" | undefined;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant: 'primary' | 'secondary' | 'success' | 'danger'
};
interface User {
  email: string;
  phoneNumber: string;
  fullName: string;
  password: string;
  role?: string;
}

type PropLayoutAuth = {
  error?: string;
  title?: string;
  children: React.ReactNode;
  link: string;
  linkText?: string;
};

type PropsAdmin = {
  children: React.ReactNode;
}

type PropsListSidebar = {
  lists: Array<{
    title: string,
    url: string
    icon: React.ReactNode
  }>,
}

export type {InputProps, ButtonProps, User, PropLayoutAuth, PropsAdmin, PropsListSidebar}