using AutoMapper;
using AutoMapper.QueryableExtensions;
using BasicWebApi.Core.App.Common.Exceptions;
using BasicWebApi.Core.Domain;
using BasicWebApi.Data.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BasicWebApi.Core.App.Event.Queries.GetLIst
{
	public class GetEventListQueryHandler : IRequestHandler<GetEventListQuery, EventListVM>
	{
		private IScheduleDbContext _dbContext;
		private IMapper _mapper;
		public GetEventListQueryHandler(IScheduleDbContext dbContext, IMapper mapper)
		{
			_dbContext = dbContext;
			_mapper = mapper;
		}

		public async Task<EventListVM> Handle(GetEventListQuery request, CancellationToken cancellationToken)
		{
			var _events = await _dbContext.Events
				.Where(x => x.UserId == request.UserId &&
				(x.DateTimeStart <= request.To && x.DateTimeStart >= request.From))
				.ProjectTo<EventListDTO>(_mapper.ConfigurationProvider)
				.ToListAsync(cancellationToken);
			if (_events == null || !_events.Any())
			{
				throw new NotFoundException(nameof(EventListVM), request.UserId);
			}
			return new EventListVM
			{
				listDTOs = _events
			};
		}
	}
}
