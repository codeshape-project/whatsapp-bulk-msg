// import { useEffect, useState } from "react";

// // Runs an api function once on mount and tracks loading / error state.
// export default function useFetch(fetcher) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let active = true;
//     setLoading(true);
//     fetcher()
//       .then((res) => active && setData(res))
//       .catch((err) => active && setError(err))
//       .finally(() => active && setLoading(false));
//     return () => {
//       active = false;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return { data, setData, loading, error };
// }

import { useEffect, useState } from "react";

// Runs an api function once on mount and tracks loading / error state.
export default function useFetch(fetcher) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    const load = () => {
      setLoading(true);
      setError(null);
      fetcher()
        .then((res) => active && setData(res))
        .catch((err) => active && setError(err))
        .finally(() => active && setLoading(false));
    };
    load();
    // Refresh page data after the active organization changes.
    const onOrganizationChange = () => load();
    window.addEventListener("organization-changed", onOrganizationChange);
    return () => {
      active = false;
      window.removeEventListener("organization-changed", onOrganizationChange);
    };
    // Fetchers are stable API functions; deliberately load on mount and org switch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, setData, loading, error };
}
