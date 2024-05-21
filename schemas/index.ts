export interface Preview {
  title: string;
  children?: React.ReactNode;
}

export interface MainProps {
  children: React.ReactNode;
  title: string;
  loading?: boolean;
}



export interface accessProps {
  setAccess:(access:boolean)=>void

}