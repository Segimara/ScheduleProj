using BasicWebApi.Core.Domain;
using BasicWebApi.Data.Interfaces;
using MediatR;

namespace BasicWebApi.Core.App.Event.Commands.Create
{
    public class CreateEventCommandHandler : IRequestHandler<CreateEventCommand, EventModel>
    {
        private IScheduleDbContext _dbContext;
        public CreateEventCommandHandler(IScheduleDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<EventModel> Handle(CreateEventCommand request, CancellationToken cancellationToken)
        {
            var _event = new EventModel
            {
                Id = Guid.NewGuid(),
                UserId = request.UserId,
                Title = request.Title,
                Description = request.Description,
                Priority = request.Priority,
                Start = request.Start,
                End = request.End,
                State = Domain.Enums.State.Added,
                Timestamp = DateTime.UtcNow,
            };
            await _dbContext.Events.AddAsync(_event, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return _event;
        }
    }
}
