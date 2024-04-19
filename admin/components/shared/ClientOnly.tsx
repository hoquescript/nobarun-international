import { useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
}
function ClientOnly(props: ClientOnlyProps) {
  const { children, ...delegated } = props;
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}

export default ClientOnly;
