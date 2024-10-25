export async function fetchNui<T = any>(
  eventName: string,
  data?: object
): Promise<T> {
  const options: RequestInit = {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  };

  const resourceName = window.GetParentResourceName
    ? window.GetParentResourceName()
    : "nui-frame-app";

  const resp: Response = await fetch(
    `https://${resourceName}/${eventName}`,
    options
  );

  const respFormatted: T = await resp.json();

  return respFormatted;
}
