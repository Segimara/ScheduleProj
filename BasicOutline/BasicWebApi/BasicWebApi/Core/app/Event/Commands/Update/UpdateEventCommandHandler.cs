using BasicWebApi.Core.App.Common.Exceptions;
using BasicWebApi.Core.Domain;
using BasicWebApi.Data.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BasicWebApi.Core.App.Event.Commands.Update
{
    public class UpdateEventCommandHandler : IRequestHandler<UpdateEventCommand, EventModel>
    {
        private IScheduleDbContext _dbContext;
        public UpdateEventCommandHandler(IScheduleDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<EventModel> Handle(UpdateEventCommand request, CancellationToken cancellationToken)
        {
            var _event = await _dbContext.Events.FirstOrDefaultAsync(x => x.Id == request.Id && x.UserId == request.UserId, cancellationToken);
            if (_event == null)
            {
                throw new NotFoundException(nameof(_event), request.Id);
            }

            _event.UserId = request.UserId;
            _event.Title = request.Title;
            _event.Description = request.Description;
            _event.Priority = request.Priority;
            _event.Start = request.Start;
            _event.End = request.End;
            _event.State = Domain.Enums.State.Modified;
            _event.Timestamp = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync(cancellationToken);
            return _event;
        }
    }
}
