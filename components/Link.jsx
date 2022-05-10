import NextLink from "next/link";

export { Link };

function Link({ href, className, children, ...props }) {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  );
}
