﻿using AutoMapper;
using BasicWebApi.Core.App.Common.Mapping;
using BasicWebApi.Core.App.Event.Commands.Create;

namespace BasicWebApi.Controllers.Dtos
{
	public class CreateEventDto : IMapWith<CreateEventCommand>
	{
		public string Title { get; set; }
		public string Description { get; set; }
		public int Priotity { get; set; }
		public DateTime DateTimeStart { get; set; }
		public DateTime DateTimeEnd { get; set; }

		public void Mapping(Profile profile)
		{
			profile.CreateMap<CreateEventDto, CreateEventCommand>();
		}

	}
}