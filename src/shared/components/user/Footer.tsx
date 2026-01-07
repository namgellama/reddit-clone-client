const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="text-xs text-muted-foreground fixed bottom-5">
            Reddit, Inc. &copy; {currentYear}. All rights reserved.
        </footer>
    );
};

export default Footer;
