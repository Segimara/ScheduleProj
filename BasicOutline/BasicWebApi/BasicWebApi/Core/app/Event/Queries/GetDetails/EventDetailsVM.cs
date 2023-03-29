using AutoMapper;
using BasicWebApi.Controllers.Dtos;
using BasicWebApi.Core.App.Common.Mapping;
using BasicWebApi.Core.App.Event.Commands.Create;
using BasicWebApi.Core.Domain;
using BasicWebApi.Core.Domain.Enums;

namespace BasicWebApi.Core.App.Event.Queries.GetDetails
{
	public class EventDetailsVM : IMapWith<EventModel>
	{
		public Guid Id { get; set; }
		public Guid UserId { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public int Priotity { get; set; }
		public DateTime DateTimeStart { get; set; }
		public DateTime DateTimeEnd { get; set; }
		//public List<ImageModel> Images { get; set; }
		public void Mapping(Profile profile)
		{
			profile.CreateMap<EventDetailsVM, EventModel>();
		}
	}
}
