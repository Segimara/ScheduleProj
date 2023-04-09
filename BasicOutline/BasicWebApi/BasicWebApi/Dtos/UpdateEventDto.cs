using AutoMapper;
using BasicWebApi.Core.App.Common.Mapping;
using BasicWebApi.Core.App.Event.Commands.Create;
using BasicWebApi.Core.App.Event.Commands.Update;

namespace BasicWebApi.Controllers.Dtos
{
	public class UpdateEventDto : IMapWith<UpdateEventCommand>
	{
		public string Title { get; set; }
		public string Description { get; set; }
		public int Priotity { get; set; }
		public DateTime Start { get; set; }
		public DateTime End { get; set; }
		public void Mapping(Profile profile)
		{
			profile.CreateMap<UpdateEventDto, UpdateEventCommand>();
		}
	}
}
