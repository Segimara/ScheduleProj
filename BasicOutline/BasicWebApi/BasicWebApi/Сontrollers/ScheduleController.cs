using AutoMapper;
using BasicWebApi.Core.App.Event.Commands.Create;
using BasicWebApi.Core.App.Event.Commands.Update;
using BasicWebApi.Core.App.Event.Commands.Delete;
using BasicWebApi.Core.App.Event.Queries.GetDetails;
using BasicWebApi.Core.App.Event.Queries.GetLIst;
using BasicWebApi.Core.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using BasicWebApi.Controllers.Dtos;

namespace BasicWebApi.Controllers
{
	[Authorize]
    [Produces("application/json")]
    public class ScheduleController : BaseController
	{
		IMapper _mapper;
		public ScheduleController(IMapper mapper)
		{
			_mapper = mapper;
		}

		/// <summary>
		/// Get Deteils of event
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpGet("{id}")]
		public async Task<ActionResult<EventDetailsVM>> Get(string id)
		{
			var request = new GetEventDetailsQuery
			{
				Id = Guid.Parse(id),
				UserId = UserId
			};
			return await Mediator.Send(request);
		}
		/// <summary>
		/// Get List Of events where StartTime are between from and to
		/// </summary>
		/// <param name="From"></param>
		/// <param name="To"></param>
		/// <returns></returns>
		[HttpGet("{From},{To}")]
		public async Task<ActionResult<EventListVM>> GetList(DateTime From, DateTime To)
		{
			var request = new GetEventListQuery
			{
				UserId = UserId,
				From = From,
				To = To
			};
			return await Mediator.Send(request);
		}
        /// <summary>
        /// Create an event
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        [HttpPost]
		public async Task<ActionResult<EventModel>> Create([FromBody] CreateEventDto dto)
		{
			var request = _mapper.Map<CreateEventCommand>(dto);
			request.UserId = UserId;
			return await Mediator.Send(request);
		}
		/// <summary>
		/// Delete an event
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpDelete("{id}")]
		public async Task<ActionResult<Guid>> Delete(string id)
		{
			var request = new DeleteEventCommand
			{
				Id = Guid.Parse(id),
				UserId = UserId
			};
			return await Mediator.Send(request);
		}
		/// <summary>
		/// Update an event
		/// </summary>
		/// <param name="dto"></param>
		/// <returns></returns>
		[HttpPut]
		public async Task<ActionResult<EventModel>> Update([FromBody] UpdateEventDto dto)
		{
			var request = _mapper.Map<UpdateEventCommand>(dto);
			request.UserId = UserId;
			return await Mediator.Send(request);
		}
	}
}
