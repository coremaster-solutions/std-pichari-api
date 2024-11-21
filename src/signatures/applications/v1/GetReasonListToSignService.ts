export class GetReasonListToSignService {
  async execute() {
    const reasonList = await new Promise((resolve) => {
      resolve([
        {
          id: "3d0afbfe-7381-4ea3-b403-056d2b0c99cd",
          name: "Soy el autor del documento",
        },
        {
          id: "31aeaeba-afbc-46b6-808c-1b35d6b70f98",
          name: "En señal de conformidad",
        },
        {
          id: "69146993-e7c8-472c-b7cf-9f3bc2a6be2e",
          name: "Doy V° B°",
        },
        {
          id: "6e81ed2f-3b70-4772-9dc2-3b250b9640a2",
          name: "Por encargo",
        },
        {
          id: "6e91b5d0-6147-48fc-912a-7dc593e05136",
          name: "Doy fé",
        },
      ] as { id: string; name: string }[]);
    });

    return {
      message: "Successful",
      code: "000000",
      data: reasonList,
    };
  }
}
