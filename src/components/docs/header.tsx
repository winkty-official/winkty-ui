interface HeaderProps {
  title: string;
  description: string;
}

const Header = ({ description, title }: HeaderProps) => {
  return (
    <section className="">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </section>
  );
};

export default Header;
