using AutoMapper;
using BasicWebApi.Core.App.Common.Exceptions;
using BasicWebApi.Data.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.Diagnostics;
using Microsoft.EntityFrameworkCore;

namespace BasicWebApi.Core.App.Event.Queries.GetDetails
{
	public class GetEventDetailsQueryHandler : IRequestHandler<GetEventDetailsQuery, EventDetailsVM>
	{
		private IScheduleDbContext _dbContext;
		private IMapper _mapper;
		public GetEventDetailsQueryHandler(IScheduleDbContext dbContext, IMapper mapper)
		{
			_dbContext = dbContext;
			_mapper = mapper;
		}

		public async Task<EventDetailsVM> Handle(GetEventDetailsQuery request, CancellationToken cancellationToken)
		{
			var _event = await _dbContext.Events.FirstOrDefaultAsync(x => x.Id == request.Id && x.UserId == request.UserId, cancellationToken);
			if (_event == null)
			{
				throw new NotFoundException(nameof(_event), request.Id);
			}
			return _mapper.Map<EventDetailsVM>(_event);
		}
	}
}
