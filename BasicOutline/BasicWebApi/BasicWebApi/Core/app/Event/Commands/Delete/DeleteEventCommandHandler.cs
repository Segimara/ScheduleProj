using BasicWebApi.Core.App.Common.Exceptions;
using BasicWebApi.Data.Interfaces;
using MediatR;
using System.Linq;

namespace BasicWebApi.Core.App.Event.Commands.Delete
{
	public class DeleteEventCommandHandler : IRequestHandler<DeleteEventCommand, Guid>
	{
		private IScheduleDbContext _dbContext;
		public DeleteEventCommandHandler(IScheduleDbContext dbContext)
		{
			_dbContext = dbContext;
		}
		public async Task<Guid> Handle(DeleteEventCommand request, CancellationToken cancellationToken)
		{
			var _event = _dbContext.Events.FirstOrDefault(x => x.Id == request.Id && x.UserId == request.UserId);
			if (_event == null)
			{
				throw new NotFoundException(nameof(_event), request.Id);
			}
			_dbContext.Events.Remove(_event);
			await _dbContext.SaveChangesAsync(cancellationToken);
			return request.Id;
		}
	}
}
