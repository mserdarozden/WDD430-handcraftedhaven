'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p>WDD430 - Web Full Stack Development | Brigham Young University</p>
      <p>Created by Konstantin Bolotov, Mustafa Serdar Ozden, George Nicodemus Kijjambu Ndiwalana | &copy; {currentYear}</p>
    </footer>
  );
}

