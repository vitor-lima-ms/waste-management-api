/**
 * Fill disposalPointSelect
 */
class FindAllDisposalPointsResponse {
  dpAcceptedWasteCategory: string;
  dpId: string;
  dpLatitude: string;
  dpLocalityName: string;
  dpLocalityType: string;
  dpLongitude: string;
  dpNeighborhood: string;
}

class Response {
  count: number;
  data: FindAllDisposalPointsResponse[];
  success: boolean;
}

const disposalPointSelect = document.getElementById("disposalPointSelect")!;

fetch("http://localhost:3000/disposal-points", {
  method: "GET",
})
  .then(async (value) => {
    const { data } = (await value.json()) as Response;

    console.log(data);

    for (let i = 0; i < data.length; i++) {
      const disposalPoint = data[i];

      disposalPointSelect.innerHTML += `<option value=${disposalPoint.dpId}>${disposalPoint.dpLocalityName}</option>`;
    }
  })
  .then(
    () => console.log("Pontos de descarte obtidos com sucesso!"),
    () => console.error("Erro ao obter os pontos de descarte!"),
  );
