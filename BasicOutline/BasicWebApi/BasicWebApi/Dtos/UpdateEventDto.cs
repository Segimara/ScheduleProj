using AutoMapper;
using BasicWebApi.Core.App.Event.Commands.Create;
using BasicWebApi.Core.App.Event.Commands.Update;

namespace BasicWebApi.Controllers.Dtos
{
	public class UpdateEventDto
	{
		public string Title { get; set; }
		public string Description { get; set; }
		public int Priotity { get; set; }
		public DateTime DateTimeStart { get; set; }
		public DateTime DateTimeEnd { get; set; }
		public void Mapping(Profile profile)
		{
			profile.CreateMap<UpdateEventDto, UpdateEventCommand>();
		}
	}
}
