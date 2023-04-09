using AutoMapper;
using BasicWebApi.Core.App.Common.Mapping;
using BasicWebApi.Core.App.Event.Queries.GetDetails;
using BasicWebApi.Core.Domain;

namespace BasicWebApi.Core.App.Event.Queries.GetLIst
{
	public class EventListDTO : IMapWith<EventModel>
	{
		public Guid Id { get; set; }
		public Guid UserId { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public int Priotity { get; set; }
		public DateTime Start { get; set; }
		public DateTime End { get; set; }

		public void Mapping(Profile profile)
		{
			profile.CreateMap<EventModel, EventListDTO>()
				.ForMember(x => x.Description, opt =>
				opt.MapFrom(x => x.Description.Take(255)));
		}
	}
}
